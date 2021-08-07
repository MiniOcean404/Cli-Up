const spawn = require("cross-spawn");
const {info} = require("../utils/utils");

async function build(scripts, env) {
    let command = null

    try {
        if (scripts) {
            command = spawn('npm', ['run', `${env.command}`], {stdio: 'inherit'});
        } else {
            command = spawn([`${env.command}`], {stdio: 'inherit'});
        }
    } catch (e) {
        info('bgBlue',`打包失败\r\n错误信息：${e}`)
    }

    return new Promise((resolve, reject) => {
        command.on("exit", code => {
            if (code === 0) {
                resolve(true)
                info('bgBlue', '打包完成')
            }

            reject(false)
        })
    })

}

module.exports = build