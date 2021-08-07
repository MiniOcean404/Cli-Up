const chalk = require('chalk') //命令行颜色
const figlet = require('figlet')
const createConfig = require("./create");
const Generator = require("./generator");
const PackageJson = require("../../package.json"); //创建图形化LOGO

function firstLine(program) {
    program
        .name("up")
        .usage("[选项] 命令")
}

function command(program) {
    program
        .command('init')
        .option('-f, --force', '如果创建的文件存在则直接覆盖')
        .description('创建一个上传的配置文件')
        .action(async function (name, option) {
            const targetAir = await createConfig(name, option)
            // 创建项目
            const generator = new Generator(targetAir);
            // 开始创建项目
            await generator.create()
        })
}

function help(program) {

    program
        .command('help')
        .description('显示帮助信息')

    const
        warp = '\r\n',
        logo = figlet.textSync('up', {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 300,
            whitespaceBreak: true
        }),
        addLogoColor = chalk.cyan(logo),
        spliceLogo = `${warp}${addLogoColor}`

    program.addHelpText("before", spliceLogo)
    program.helpOption('-h, --help', '展示帮助信息');

    program
        .on('--help', () => {
            const
                tip = `up --help 或者 up -h`,
                addTipColor = chalk.cyan(tip),
                spliceTip = `${warp} 运行${addTipColor} 获取命令使用的详情 ${warp}`

            console.log(spliceTip);
        })
}

function version(program) {
    program
        .version(PackageJson.version, '-v', `版本:${PackageJson.version}`) // 配置版本号信息
}

/**
 * 初始化打包命令
 */
function addBuildCommand(program, path, task) {
    const config = require(path)
    for (const i of Object.entries(config.env)) {
        const key = i[0]
        const value = i[1]
        if (Object.keys(value).length >= 6) {
            program
                .option(`-${key.slice(0, 1)}, --${key}`, `创建一个打包${key}环境的命令`)
                .action(task)
        }
    }
}

module.exports = {
    firstLine,
    help,
    command,
    addBuildCommand,
    version
}