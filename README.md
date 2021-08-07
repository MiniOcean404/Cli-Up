# 基于fpt的打包自动上传

## 执行初始化
```npm
up init
```
## 帮助信息
初始化后可通过命令查看配置文件信息，或在配置文件更改后查看配置信息
```npm
up -h
```

## 配置文件
```js
module.exports = {
    package: './dist',                        //打包的目录（需要放置的index.html包上一层）
    scripts:true,                             //是否是npm中的 npm run xxx脚本
    env: {                                    //环境配置
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
```