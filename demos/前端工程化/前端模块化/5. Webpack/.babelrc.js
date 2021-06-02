module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        chrome: 58,
        ie: 9
      },
      modules: false,       // 保留 ES6 modules，不转换成其他类型模块
      debug: true,          // 保留 console.log 到输出文件，方便调试
      useBuiltIns: 'entry', // 按需导入 core-js 支持的 ES6 新 API
      corejs: {             // 指定 core-js 版本
        version: "3.13", 
        proposals: true 
      },          
    }]
  ],
  plugins: ["@babel/plugin-transform-runtime"],
}