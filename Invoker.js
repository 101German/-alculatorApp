class Invoker {
    constructor(commandHistory, buttons, command = '') {
        this.commandHistory = [];
        this.buttons = [];
        this.command = command;
    }

    setCommand(command) {
        this.command = command;
    }
    getCommand() {
        return this.command;
    }
    run() {
        if (this.command != '') {
            var res = this.command.execute();
            this.commandHistory.push(this.command);
            return res;
        }
    }
    cancel() {
    

        this.command = this.commandHistory.pop();
        if (this.command !== undefined && Object.getPrototypeOf(this.command.constructor).name === 'MemoryCommand') {
            
            this.command.undo();
            return;
        }
        else if(this.command !== undefined){
            var res = this.command.undo();
            return res;
        }
        console.log('cancel');
        return;
    }

}