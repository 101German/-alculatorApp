let leftOperand = '';
let rightOperand = '';
let sign = '';
let isCalculated = false;
let savedNum = '';

let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let signs = ['mc', 'm+', 'm-', 'mr', '+/-', '%', '/', 'x^2', 'x^3', 'x^y', '10^x', 'x', '1/x', '2√x', '3√x', 'y√x', '-', 'x!', '+'];

var calcScreen = document.querySelector('.calc-screen p');

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;

    let key = event.target.textContent;
    if (digits.includes(key)) {
        if (rightOperand === '' && sign === '') {
            if (key === '.' && leftOperand === '') {
                leftOperand = '0.';
                calcScreen.textContent = leftOperand;
            }
            else if (key === '.' && leftOperand.includes('.')) {
                calcScreen.textContent = leftOperand;
            }
            else {
                leftOperand += key;
                calcScreen.textContent = leftOperand;
                console.log("left operand: " + leftOperand);
            }
        }
        else if (isCalculated) {
            console.log("isCalculated");
            if (key === '.' && rightOperand === '') {
                rightOperand = '0.';
                calcScreen.textContent = rightOperand;
                isCalculated = false;
            }
            else {
                rightOperand = key;
                calcScreen.textContent = rightOperand;
                isCalculated = false;
            }
        }
        else if (leftOperand != '' && sign != '') {
            if (key === '.' && rightOperand === '') {
                rightOperand = '0.';
                calcScreen.textContent = rightOperand;
            }
            else if (key === '.' && rightOperand.includes('.')) {
                calcScreen.textContent = rightOperand;
            }
            else {
                rightOperand += key;
                calcScreen.textContent = rightOperand;
                console.log("right operand: " + rightOperand);
            }
        }
    }

    if (signs.includes(key)) {
        if (key === 'mc') {
            savedNum = '';
        }
        else if (key === 'mr' && savedNum != '') {
            calcScreen.textContent = savedNum;
            leftOperand = savedNum;
        }
        else if (key === 'm+') {
            savedNum = savedNum === '' ? calcScreen.textContent : (+savedNum) + (+calcScreen.textContent);
            leftOperand = '';
        }
        else if (key === 'm-') {
            savedNum = savedNum === '' ? -calcScreen.textContent : savedNum - calcScreen.textContent;
            leftOperand = '';
        }
        else if ((sign != '' && rightOperand != '') || key === '+/-' || key === '%' || key === 'x^2' || key === 'x^3'
            || key === 'x^y' || key === '10^x' || key === '1/x' || key === '2√x' || key === '3√x' || key === 'y√x'
            || key === 'x!') {
            sign = key;
            console.log(sign);
            calculate()
        }
        else{
            sign = key;
        }

    }

    if (key == '=') {
        calculate();
    }

}

function calculate() {

    isCalculated = true;
    switch (sign) {
        case '+':
            leftOperand = leftOperand == '' ? rightOperand : (+leftOperand) + (+rightOperand);
            break;
        case '-':
            leftOperand = leftOperand == '' ? -rightOperand : leftOperand - rightOperand;
            break;
        case 'x':
            leftOperand = leftOperand == '' ? '0' : leftOperand * rightOperand;
            break;
        case '/':
            if (rightOperand === '0') {
                clearAll();
                calcScreen.textContent = 'Error';
                throw new Error("division on zero");
            }
            else {
                leftOperand = leftOperand == '' ? '0' : leftOperand / rightOperand;
            }
            break;
        case 'x^2':
            if (rightOperand != '') {
                leftOperand = computePower(rightOperand, 2);
            }
            else {
                leftOperand = computePower(leftOperand, 2);
            }
            break;
        case 'x^3':
            if (rightOperand != '') {
                leftOperand = computePower(rightOperand, 3);
            }
            else {
                leftOperand = computePower(leftOperand, 3);
            }
            break;
        case '10^x':
            if (rightOperand != '') {
                leftOperand = computePower(10, rightOperand);
            }
            else {
                leftOperand = computePower(10, leftOperand);
            }
            break;
        case 'x^y':
            if (leftOperand != '' && rightOperand != '') {
                leftOperand = computePower(leftOperand, rightOperand);
            }
            else {
                return;
            }
            break;
        case '1/x':
            console.log('1/x log')
            if (rightOperand != '') {
                if (rightOperand === '0') {
                    clearAll();
                    calcScreen.textContent = 'Error';
                    throw new Error("division on zero");
                }
                else {
                    leftOperand = '1' / rightOperand;
                }
            }
            else {
                if (leftOperand === '0' || leftOperand === '') {
                    clearAll();
                    calcScreen.textContent = 'Error';
                    throw new Error("division on zero");
                }
                else {
                    leftOperand = '1' / leftOperand;
                }
            }
            break;
        case '%':
            if (rightOperand != '') {
                leftOperand = rightOperand / '100';
            }
            else {
                leftOperand = leftOperand / '100';
            }
            break;
        case '2√x':
            if (rightOperand != '') {
                leftOperand = computePower(leftOperand, 0.5);
            }
            else {
                leftOperand = computePower(leftOperand, 0.5);
            }
            break;
        case '3√x':
            if (rightOperand != '') {
                leftOperand = computePower(leftOperand, 1 / 3);
            }
            else {
                leftOperand = computePower(leftOperand, 1 / 3);
            }
            break;
        case 'y√x':
            if (rightOperand === '') {
                leftOperand = computePower(leftOperand, 1 / leftOperand);
            }
            else {
                console.log('try')
                leftOperand = computePower(leftOperand, 1 / rightOperand);
                console.log('left operand after calculate:' + leftOperand);
            }
            break;
        case 'x!':
            if (rightOperand != '') {
                leftOperand = factorial(rightOperand);
            }
            else {
                leftOperand = factorial(leftOperand);
            }
            break;
        case '+/-':
            if (rightOperand != '') {
                leftOperand = rightOperand * (-1);
            }
            else {
                leftOperand = leftOperand * (-1);
            }
            break;
        default:
            isCalculated = false;
            return;

    }
    calcScreen.textContent = leftOperand;
    rightOperand = '';
}

function computePower(num, degree) {
    return (num ** degree).toFixed();
}
function factorial(n) {
    return (n != 1) ? n * factorial(n - 1) : 1;
}
function clearAll() {
    leftOperand = '';
    rightOperand = '';
    sign = '';
    isCalculated = false;
    calcScreen.textContent = 0;
}
