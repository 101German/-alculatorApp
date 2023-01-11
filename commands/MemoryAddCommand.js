class MemoryAddCommand extends MemoryCommand{
    tempNum = '';
    tempLeftperand = '';
    constructor() {
        super()
    }

    execute() {
        this.tempNum = savedNum;
        console.log("temp num: " + this.tempNum)
        savedNum = savedNum === '' ? calcScreen.textContent : (+savedNum) + (+calcScreen.textContent);
    }
    undo() {
        savedNum = this.tempNum;
        console.log('saved num: ' + savedNum);
    }
}