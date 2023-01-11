class MemorySubtractionCommand extends MemoryCommand {
    tempNum = '';
    tempLeftperand = '';
    constructor() {
        super()
    }

    execute() {
        this.tempNum = savedNum;
        this.tempLeftperand = leftOperand;
        savedNum = savedNum === '' ? -calcScreen.textContent : savedNum - calcScreen.textContent;
        leftOperand = '';
    }
    undo() {
        console.log('cancel');
        leftOperand = this.tempLeftperand;
        savedNum = this.tempNum;
    }
}