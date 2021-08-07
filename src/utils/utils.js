const ora = require("ora");
const chalk = require("chalk");

// 添加加载动画请求接口函数
async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message.pending);
    // 开始加载动画
    spinner.start();

    try {
        await fn(...args);
        // 状态为修改为成功
        spinner.succeed(message.success);
    } catch (error) {
        console.log(error)
        // 状态为修改为失败
        spinner.fail(message.fail)
    }
}

function info(prop, content) {
    console.log(chalk[prop](content))
}

module.exports = {
    wrapLoading,
    info
}