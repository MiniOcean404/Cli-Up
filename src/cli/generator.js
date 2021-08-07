const fs = require('fs-extra')
const path = require('path')

const {wrapLoading} = require('../utils/utils')

class Generator {
    targetDir
    template = path.join(__dirname, `../utils/template/up.js`)

    constructor(targetDir) {
        this.targetDir = targetDir;
    }

    async create() {
        await wrapLoading(
            fs.copy, {
                pending: '写入中 ...',
                success: '写入完成 ...',
                fail: '写入失败，请清理后再尝试 ...'
            }, this.template, this.targetDir)
    }
}

module.exports = Generator;

