module.exports = {
    package: './dist',
    scripts:true,                             //是否是npm中的 npm run xxx脚本
    env: {
        dev: {
            ip: "",                           // SSH地址
            username: "",                     // SSH用户名
            port: "",                         //端口
            password: "",                     // ssh 密码
            path: '',                         // 操作FTP中的项目的开始文件夹 可以直接指向配置好的地址
            removePath: '',                   // 需要删除FTP中的项目的文件夹
            command:''                        // 如果scripts为true则配置scripts左侧的命令,否则将具体的打包命令放到其中
        },
    }
}