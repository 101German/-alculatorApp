class ComputePowerCommand {
    result = '';
    constructor(firstOperand, power) {
        this.firstOperand = firstOperand;
        this.power = power;
    }

    execute() {
        console.log('op: ' + this.firstOperand + 'po: ' + this.power)
        if(this.firstOperand )
        this.result = computePower(this.firstOperand, this.power)
        return this.result;
    }

    undo() {
        return computePower(this.result, 1 / this.power)
    }
}