class SubtractionCommand {
    constructor(leftOperand, rightOperand) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
    }

    execute() {
        this.result = this.leftOperand == '' ? -this.rightOperand : this.leftOperand - this.rightOperand;
        return this.result;
    }
    undo() {
        return this.leftOperand;
    }
}