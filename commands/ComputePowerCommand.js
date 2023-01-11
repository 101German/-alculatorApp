class ComputePowerCommand {
    result = '';
    constructor(firstOperand, power) {
        this.firstOperand = firstOperand;
        this.power = power;
    }

    execute() {
        console.log('op: ' + this.firstOperand + 'po: ' + this.power)
        if((this.power < 1 && this.power > 0) && this.firstOperand < 0){
            throw Error('Root of negative number');
        }
        this.result = computePower(this.firstOperand, this.power)
        return this.result;
    }

    undo() {
        return computePower(this.result, 1 / this.power)
    }
}