class MemoryClearCommand extends MemoryCommand {
    tempNum = '';
    constructor() {
        super()
    }

    execute() {
        this.tempNum = savedNum;
        savedNum = '';
    }

    undo() {
        savedNum = this.tempNum;
    }
}