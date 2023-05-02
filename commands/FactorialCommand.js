class FactorialCommand {
    constructor(leftOperand) {
        this.leftOperand = leftOperand;
    }

    execute() {
        return factorial(this.leftOperand);
    }

    undo() {
        return this.leftOperand;
    }
}