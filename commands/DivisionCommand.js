class DivisionCommand {
    result = '';
    constructor(leftOperand, rightOperand) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
    }

    execute() {
        console.log('s')
        if (this.rightOperand === '0' || this.rightOperand === '') {
            throw new Error("division on zero");
        }
        else {
            this.result = this.leftOperand == '' ? '0' : this.leftOperand / this.rightOperand;
            return this.result;
        }
    }

    undo() {
        return this.leftOperand;
    }
}