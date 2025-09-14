const result = document.querySelector("#result");
const dotBtn = document.querySelector("#dot");

function add(a, b) {
    return Number(a) + Number(b);
}

function substract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b); // make sure you can't divide by 0
}

let a, b;
let operator;

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

const input = document.querySelector("#input");
let inputText = "";
let justCalculated = false;

function display(str) {
    const isOperator = ["+", "-", "*", "/"].includes(str.trim());
    const isNumberOrDot = /^\d$/.test(str.trim()) || str.trim() === ".";

    // Only clear if last action was '=', and user enters a number or '.'
    if (justCalculated && isNumberOrDot) {
        clearDisplay();
        justCalculated = false;
    }

    // If last action was '=', and user enters an operator, just reset the flag
    if (justCalculated && isOperator) {
        justCalculated = false;
    }

    if (isOperator) {
        let parts = inputText.split(" ").filter(Boolean);
        if (parts.length === 3) {
            doMath();
            inputText = result.textContent;
            input.textContent = inputText;
        } else if (parts.length === 2) {
            deleteOperand();
        }
        input.textContent += " " + str.trim() + " ";
        inputText += " " + str.trim() + " ";
        dotBtn.disabled = false;
    } else {
        input.textContent += str;
        inputText += str;
    }

    if (str.trim() === ".") {
        dotBtn.disabled = true;
    }
}

function clearDisplay() {
    input.textContent = "";
    inputText = "";
    result.textContent = "";
    dotBtn.disabled = false;
}

function deleteLast() {
    // Get the last three characters to check for " operator "
    const lastThree = inputText.slice(-3);
    if (/^\s[+\-*/]\s$/.test(lastThree)) {
        deleteOperand();
    } else {
        input.textContent = input.textContent.slice(0, -1);
        inputText = inputText.slice(0, -1);
    }
}

function deleteOperand() {
    // Match: space, operator, space at the end (e.g., " + ")
    input.textContent = input.textContent.replace(/\s[+\-*/]\s$/, "");
    inputText = inputText.replace(/\s[+\-*/]\s$/, "");
}

function convertToOperation(str) { // take the input and convert it into an array of parts of the operation 
    const opArr = str.split(" ");
    return opArr;
}

function doMath() {
    let operands = convertToOperation(inputText);
    if ((operands[1] === "/") && (operands[2] === "0")) {
        result.textContent = "OOPS! Not allowed!";
    } else {
        result.textContent = Math.round(operate(operands[1], operands[0], operands[2]) * 10000) / 10000;
    }
}

function pressEquals() {
    doMath();
    justCalculated = true;
    dotBtn.disabled = false;
}