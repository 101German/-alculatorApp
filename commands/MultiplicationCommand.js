class MultiplicationCommand {
    result = '';
    constructor(leftOperand, rightOperand) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
    }

    execute() {
        this.result = this.leftOperand == '' ? '0' : this.leftOperand * this.rightOperand;
        return this.result;
    }

    undo() {
        return this.leftOperand;
    }
}