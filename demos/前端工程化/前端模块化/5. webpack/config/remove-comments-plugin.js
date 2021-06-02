const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook
} = require('tapable')

class RemoveCommentsPlugin {
  constructor() {
    // 最好将插件的自定义钩子暴露在类的hooks属性上
    this.hooks = {
      beforeWork: new SyncHook(['getUp']),
      atWork: new SyncWaterfallHook(['workTask']),
      afterWork: new SyncBailHook(['activity'])
    }
  }
  apply(compiler) {
    // Webpack工作过程中最核心的对象,包含此次构建的所有配置信息,通过这个对象注册钩子函数
    console.log(compiler)
    console.log('RemoveCommentsPlugin 启动')

    // 通过compiler对象的hooks属性访问emit钩子
    // 再通过tap()方法注册同步钩子函数，第一个参数是插件名，第二个参数是同步钩子函数
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      // assets属性获取即将写入输出目录的文件信息
      for (const name in compilation.assets) {
        console.log(name) // 输出文件名
        console.log(compilation.assets[name].source()) // 输出文件内容

        // 去掉JS文件注释
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
  tapTap() {
    // 同步钩子函数：同一个钩子上的所有同步钩子函数按注册顺序执行
    this.hooks.beforeWork.tap('getOut', () => {
      console.log('出门')
    })
    this.hooks.atWork.tap('makePPT', () => {
      console.log('做 PPT')
      return '你的 ppt'
    })
    this.hooks.afterWork.tap('goHome', (work) => {
      console.log('带着工作回家：' + work)
    })

    // 异步钩子函数：callback()类似于generator函数的next()
    this.hooks.beforeWork.tapAsync('putOnCloth', (params, callback) => {
      console.log('穿衣服')
      callback() // 此处无callback，则getOut不会执行
    })
    this.hooks.beforeWork.tapAsync('getOut', (params, callback) => {
      console.log('出门')
      callback() // 此处无callback，则无法跳出
    })
  }
  run() {
    this.hooks.beforeWork.call()
    this.hooks.atWork.call()
    this.hooks.afterWork.call()
  }
}
module.exports = RemoveCommentsPlugin
