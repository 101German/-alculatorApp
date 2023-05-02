class AdditionCommand {
  constructor(leftOperand, rightOperand) {
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
  execute() {
    return this.leftOperand == '' ? this.rightOperand : (+this.leftOperand) + (+this.rightOperand);
  }
  undo() {
    return this.leftOperand;
  }
}