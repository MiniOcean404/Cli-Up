const {commandInit, createProgram} = require('./command')

function up() {
    // 创建全局对象，创建对应的命令，执行对应的函数
    const getProgramFn = createProgram()
    const Program = getProgramFn()
    commandInit(Program)
}

module.exports = up