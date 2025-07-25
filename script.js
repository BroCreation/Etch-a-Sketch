// Elements
const gridContainer = document.querySelector('.drawpad')
const boxesInput = document.querySelector('.controls .amount')
const colorInput = document.querySelector('.controls .color')
const submitBtn = document.querySelector('.submit')

// Grid/Container Values
const containerWidth = parseInt(getComputedStyle(gridContainer).getPropertyValue('width'))
let numberOfBoxes = boxesInput.value;
// Changeable Values
let boxSize = containerWidth / numberOfBoxes;
let paintColor = colorInput.value;

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

function removeGrid() {
    if(gridContainer.hasChildNodes()) {
        const allGridBoxes = Array.from(gridContainer.childNodes);
        allGridBoxes.forEach((gridBox) => {
            gridBox.remove()
        })
    }
}

function valuesHaveChanged() {
    // Check if displayed boxes equal specified input value
    const containerBoxes = gridContainer.childElementCount;
    const totalInputBoxes = numberOfBoxes * numberOfBoxes // rows * columns
    return (containerBoxes !== totalInputBoxes)
}

// Change Settings
boxesInput.addEventListener('change', changeSize)
colorInput.addEventListener('change', changeColor)

submitBtn.addEventListener('click', () => {
    // Display first grid when it has nothing
    // Display all new grids when values have changed by removing previous grid
    // If The Grid does not have same number of boxes to the inputs then remove and display
    changeAllValues()

    if (!gridContainer.hasChildNodes() || valuesHaveChanged()) {
        removeGrid()
        displayGrid()
    } else {
        alert('You have to change the canvas size to make another canvas.')
    }
})

// Grid Container Coloring / Hover Effect
function fillColor(e) {
    const target = e.target;
    target.style.backgroundColor = paintColor
}

gridContainer.addEventListener('mouseover', fillColor)