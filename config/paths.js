const { join } = require('path')

const rootDir = join(__dirname, '../')
const srcDir = join(rootDir, 'src')
const distDir = join(rootDir, 'dist')
const appDir = join(srcDir, 'app')
const publicDir = join(srcDir, 'public')
const entryFile = join(appDir, 'index.js')
const index = join(srcDir, 'index.html')

const paths = {
    rootDir,
    entryFile,
    distDir,
    appDir,
    publicDir,
    index,
}

module.exports = paths
