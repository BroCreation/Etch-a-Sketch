// Elements
const gridContainer = document.querySelector('.drawpad')
const boxesInput = document.querySelector('.controls .amount')
const colorInput = document.querySelector('.controls .color')
const submitBtn = document.querySelector('.submit')
const toggleRgbBtn = document.querySelector('.toggleRgb')

// Grid/Container Values
const containerWidth = parseInt(getComputedStyle(gridContainer).getPropertyValue('width'))
let numberOfBoxes = boxesInput.value;
// Changeable Values
let boxSize = containerWidth / numberOfBoxes;
let paintColor = colorInput.value;
// Range for Number of Boxes
const min = 1;
const max = 100;
// RGB
let isRgbOn = false

function changeSize() {
    numberOfBoxes = boxesInput.value;
    boxSize = containerWidth / numberOfBoxes;
}

function changeColor() {
    paintColor = colorInput.value;
}

function changeAllValues() {
    changeSize()
    changeColor()
}

// Grid Creation
function displayGrid() {
    const min = 1;
    const max = 100; 
    if(boxesInput.value >= min && boxesInput.value <= max) {
        for(let i = 0; i < numberOfBoxes; i++) {
            for(let j = 0; j < numberOfBoxes; j++) {
                const box = document.createElement('div')
                box.style.backgroundColor = paintColor
                box.style.width = `${boxSize}px`
                box.style.height = `${boxSize}px`
                box.style.border = "1px solid black"
                gridContainer.appendChild(box)
            }
        }
    }
}

function removeGrid() {
    if(gridContainer.hasChildNodes()) {
        const allGridBoxes = Array.from(gridContainer.childNodes);
        allGridBoxes.forEach((gridBox) => {
            gridBox.remove()
        })
    }
}

function hasValueChanged() {
    // Check if displayed boxes equal specified input value
    const containerBoxes = gridContainer.childElementCount;
    const totalInputBoxes = numberOfBoxes * numberOfBoxes // rows * columns
    return (containerBoxes !== totalInputBoxes)
}

function isValueInRange(min, max) {
    return (boxesInput.value >= min && boxesInput.value <= max) ? true : 
            alert(`Out of range: ${min} and ${max}`)
}

// Change Settings
boxesInput.addEventListener('change', changeSize)
colorInput.addEventListener('change', changeColor)

submitBtn.addEventListener('click', () => {
    // Display first grid when it has nothing
    // Display all new grids when values have changed by removing previous grid
    // If The Grid does not have same number of boxes to the inputs then remove and display
    changeAllValues()

    if ((!gridContainer.hasChildNodes() || hasValueChanged()) && isValueInRange(min, max)) {
        removeGrid()
        displayGrid()
    } else if (!hasValueChanged()) {
        alert('You have to change the canvas size to make another canvas.')
    }
})

// Draw only when both mousedown and paint on mouseover
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Grid Container Coloring / Hover Effect
function fillColor(e) {
    const target = e.target;
    if (e.type === "mouseover" && !mouseDown) return
    if (isRgbOn) 
        target.style.backgroundColor = generateRandomRGB()
    else 
        target.style.backgroundColor = paintColor
}

function generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

function toggleRgb() {
    if (isRgbOn) isRgbOn = false
    else isRgbOn = true
}

toggleRgbBtn.addEventListener('click', toggleRgb)
gridContainer.addEventListener('mouseover', fillColor)
gridContainer.addEventListener('mousedown', fillColor) // draw on click