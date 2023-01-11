let ctrl = false;
let z = false;
let leftOperand = '';
let rightOperand = '';
let sign = '';
let isCalculated = false;
let savedNum = '';
let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let signs = ['mc', 'm+', 'm-', 'mr', '+/-', '%', '/', 'x^2', 'x^3', 'x^y', '10^x', 'x', '1/x', '2√x', '3√x', 'y√x', '-', 'x!', '+'];

let invoker = new Invoker();

var calcScreen = document.querySelector('.calc-screen p');

document.querySelector('.ac').onclick = clearAll;
document.addEventListener('keyup', (event) => {
    if (event.keyCode === 17) {
        console.log('up ctrl');
        ctrl = false;
    }
    else if (event.keyCode === 90) {
        console.log('up z');
        z = false;
    }
})

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 17) {
        ctrl = true;
    }
    else if (event.keyCode === 90) {
        z = true;
    }

    if (z && ctrl) {
        var res = invoker.cancel();
        console.log('res ' + res)
        if (res != undefined) {
            console.log('und')
            sign = '';
            leftOperand = res;
            calcScreen.textContent = leftOperand;
        }
        z = false;
        ctrl = false;
    }
})

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
        console.log('here')
        if (key === 'mc') {
            var command = new MemoryClearCommand();
            invoker.setCommand(command);
            invoker.run();
        }
        else if (key === 'mr' && savedNum !== '') {
            var command = new MemoryReadCommand();
            invoker.setCommand(command);
            invoker.run();
        }
        else if (key === 'm+') {
            var command = new MemoryAddCommand();
            invoker.setCommand(command);
            invoker.run();
        }
        else if (key === 'm-') {
            var command = new MemorySubtractionCommand();
            invoker.setCommand(command);
            invoker.run();
        }
        else if (sign != '' && rightOperand != '') {
            calculate();
            sign = key;
        }
        else if (key === '+/-' || key === '%' || key === 'x^2' || key === 'x^3'
            || (leftOperand != '' && rightOperand != '' && key === 'x^y') || key === '10^x' || key === '1/x' || key === '2√x' || key === '3√x' || key === 'y√x'
            || key === 'x!') {
            sign = key;
            console.log(sign);
            calculate()
        }
        else {
            sign = key;
        }

    }

    if (key == '=') {
        calculate();
    }

}

function calculate() {
    isCalculated = true;
    var command;
    switch (sign) {
        case '+':
            command = new AdditionCommand(leftOperand, rightOperand);
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '-':
            command = new SubtractionCommand(leftOperand, rightOperand);
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'x':
            command = new MultiplicationCommand(leftOperand, rightOperand);
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '/':
            command = new DivisionCommand(leftOperand, rightOperand);
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'x^2':
            if (rightOperand != '') {
                command = new ComputePowerCommand(rightOperand, 2);
            }
            else {
                command = new ComputePowerCommand(leftOperand, 2);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'x^3':
            if (rightOperand != '') {
                command = new ComputePowerCommand(rightOperand, 3);
            }
            else {
                command = new ComputePowerCommand(leftOperand, 3);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '10^x':
            console.log('10')
            if (rightOperand != '') {
                command = new ComputePowerCommand(10, rightOperand);
            }
            else {
                command = new ComputePowerCommand(10, leftOperand);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'x^y':
            if (leftOperand != '' && rightOperand != '') {
                command = new ComputePowerCommand(leftOperand, rightOperand);
                invoker.setCommand(command);
                leftOperand = invoker.run();
            }
            else {
                return;
            }
            break;
        case '1/x':
            console.log('1/x log')
            if (rightOperand != '') {
                command = new DivisionCommand(1, rightOperand);
            }
            else {
                command = new DivisionCommand(1, leftOperand);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '%':
            if (rightOperand != '') {
                command = new DivisionCommand(rightOperand, 100);
            }
            else {
                command = new DivisionCommand(leftOperand, 100);
            }

            invoker.setCommand(command);
            leftOperand = invoker.run()
            break;
        case '2√x':
            if (rightOperand != '') {
                command = new ComputePowerCommand(rightOperand, 0.5);
            }
            else {
                command = new ComputePowerCommand(leftOperand, 0.5);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '3√x':
            if (rightOperand != '') {
                command = new ComputePowerCommand(rightOperand, 1 / 3);
            }
            else {
                command = new ComputePowerCommand(leftOperand, 1 / 3);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'y√x':
            if (rightOperand === '') {
                command = new ComputePowerCommand(leftOperand, 1 / leftOperand);
            }
            else {
                command = new ComputePowerCommand(leftOperand, 1 / rightOperand);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case 'x!':
            if (rightOperand != '') {
                command = new FactorialCommand(rightOperand);
            }
            else {
                command = new FactorialCommand(leftOperand);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
            break;
        case '+/-':
            if (rightOperand != '') {
                command = new MultiplicationCommand(rightOperand, -1);
            }
            else {
                command = new MultiplicationCommand(leftOperand, -1);
            }
            invoker.setCommand(command);
            leftOperand = invoker.run();
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
