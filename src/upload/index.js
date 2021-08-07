const connectSSh = require('./sftp')
const build = require('./build')
const path = require("path");


async function Task(optionObj, commandObj) {
    const config = require(`${process.cwd()}/up.js`)

    const scripts = config.scripts
    const packageDir = path.join(process.cwd(), config.package)
    const env = config.env

    //指定是否为每个环境指定同一个打包目录
    if (packageDir !== undefined && packageDir !== null && packageDir !== '') {
        for (const [env, c] of Object.entries(config.env)) {
            c['package'] = config.package
        }
    }

    // 指定打包脚本以及打包环境配置
    for (const [key, value] of Object.entries(optionObj)) {
        if (value) {
            const buildResult = await build(scripts, env)     //打包完成
            if (buildResult) {
                await connectSSh(config.env[key])  //提交上传
            }
        }
    }
}

module.exports = Task