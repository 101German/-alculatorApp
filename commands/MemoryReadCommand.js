class MemoryReadCommand extends MemoryCommand {
    tempLeftOperand = '';
    constructor() {
        super()
    }
    execute() {
        this.tempLeftOperand = calcScreen.textContent;
        console.log('saved num: ' + savedNum);
        calcScreen.textContent = savedNum;
        if (savedNum != '0') {
            console.log('here')
            leftOperand = savedNum;
        }
    }
    undo() {
        calcScreen.textContent = this.tempLeftOperand;
        leftOperand = this.tempLeftOperand;
    }
}