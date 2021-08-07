const {Command} = require('commander') //展示可用命令，并用指定命令
const fs = require('fs-extra')
const {help, command, addBuildCommand, version, firstLine} = require('./classify')
const Task = require("../upload");

const configPath = `${process.cwd()}/up.js`

function createProgram() {
    let program = null

    return function () {
        if (program) return program
        program = new Command()
        return program
    }
}

/**
 * 初始化创建命令
 */
function commandInit(program) {

    firstLine(program)

    command(program)

    const res = fs.pathExistsSync(configPath)
    if (res) {
        addBuildCommand(program, configPath, Task)
    }

    help(program)
    version(program)

    program.parse(process.argv)

    // 获取命令行的-option选项的参数
    const option = program.opts()
}


module.exports = {
    commandInit,
    createProgram,
}
