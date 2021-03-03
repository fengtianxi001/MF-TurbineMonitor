/*
 * @description: 
 * @author: 肛肠科冯主任
 * @Date: 2020-08-29 20:13:13
 */
const path = require('path');

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    //设置全局sass
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/styles/base.scss', './src/assets/styles/mixin.scss', './src/assets/styles/variable.scss']
        })
        .end()
    })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

  }
}
function resolve(dir) {
  return path.join(__dirname, dir)
}