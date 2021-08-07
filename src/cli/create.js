const fs = require('fs-extra') // fs 的扩展工具  fs-extra
const path = require('path')
const inquirer = require('inquirer')

async function createConfig(name, options) {
    const cwd = process.cwd(); // 当前命令行选择的目录
    const targetAir = path.join(cwd,'up.js') // 需要创建的目录地址

    // 目录是否已经存在？
    if (fs.pathExistsSync(targetAir)) {
        switch (options.force) {
            case true:
                await fs.remove(targetAir)
                break
            case false:
                let {action} = await inquirer.prompt([{
                    name: 'action',
                    type: 'list',
                    message: '目标文件夹已经存在，请选择一个行为',
                    choices: [{
                        name: '覆盖',
                        value: 'overwrite'
                    }, {
                        name: '取消',
                        value: false
                    }]
                }])


                if (!action) return;
                if (action === 'overwrite') {
                    await fs.remove(targetAir)
                }
                break
        }
    }

    return targetAir
}

module.exports = createConfig