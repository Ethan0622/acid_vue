class Typer {
  constructor(str) {
    this.targetString = str
    this.outputString = ''
    this.speed = 50
    this.typing = false
  }

  /**
   * 打字机的效果输出一个字符串
   * @param tick 每次打字完成的回调函数，可拿到当前字符串
   * @param done 完成整个字符串的回调函数，可拿到最终字符串
   */
  type(tick, done) {
    if (!this.targetString || !this.targetString.length) return
    this.typing = true
    this.outputString += this.targetString[this.outputString.length]
    tick(this.outputString)
    setTimeout(() => {
      if (this.outputString.length != this.targetString.length) {
        this.type(tick, done)
      } else {
        this.typing = false
        done(this.outputString)
      }
    }, this.speed)
  }

  reset(str) {
    this.targetString = str
    this.outputString = ''
    this.typing = false
    return this
  }
}

export default Typer
