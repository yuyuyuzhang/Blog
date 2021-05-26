module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,       // 配置模块规范为 ES modules
      "useBuiltIns": "usage", // 配置按需引入 polyfill
      "targets": {            // 配置最低兼容平台
        "chrome": "58",
        "ie": "10"
      }
    }]
  ],
  "plugins": [ "@babel/plugin-transform-runtime" ]
}