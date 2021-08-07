const Sftp = require("ssh2-sftp-client");
const {info} = require('../utils/utils')

async function connectSSh(config) {
    const
        sftp = new Sftp(),
        server = {
            host: config.ip,
            port: config.port,
            username: config.username,
            password: config.password
        };

    sftp.connect(server)
        .then(() => {
            info('bgBlue',"正在执行删除服务器文件")
            return sftp.rmdir(config.removePath, true)
        })
        .then(() => {
            info('bgBlue',"开始上传")
            return sftp.uploadDir(config.package, config.path);
        })
        .then((data) => {
            sftp.end();
            info('bgBlue',`已经从 ${data} 上传完成`)
        })
        .catch((err) => {
            info('bgBlue',`失败-错误信息为\r\n${err}`)
            sftp.end();
        });
}

module.exports = connectSSh