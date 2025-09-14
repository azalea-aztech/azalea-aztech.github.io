const container = document.querySelector("#container");

function randomColor() {
    return Math.floor(Math.random() * 256);
}

function createGrid(side) {
    const containerSize = 960;
    const squareSize = containerSize / side;
    for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
            const square = document.createElement("div");
            square.style.flexBasis = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            square.style.backgroundColor = "rgb(256, 256, 256)";
            square.style.opacity = "0";
            square.addEventListener("mouseover", () => {
                let currentOpacity = parseFloat(square.style.opacity);
                if (currentOpacity < 1.0) {
                    square.style.opacity = currentOpacity + 0.1;
                }
                if (currentOpacity === 0) {
                    square.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
                }
            });
            container.appendChild(square);  
        }
    }
}

createGrid(16);

container.style.display = "flex";
container.style.flexWrap = "wrap";

const sizeBtn = document.querySelector("#size");
sizeBtn.addEventListener("click", () => {
let newSize = 0;
    while (newSize <= 0 || newSize > 100) {
        newSize = prompt("How many boxes should a side be?(0-100))")
    }
    var childNodes = document.getElementById("container").childNodes;
    for(let i = childNodes.length-1; i >= 0; i--) {
        var childNode = childNodes[i];
        childNode.parentNode.removeChild(childNode);
    }
    createGrid(newSize);
});

