const path = require("path");

module.exports = {
  alias: {
    "/@/": path.resolve(__dirname, "./src"), // 键必须以斜线开始和结束
  },
  base: "./",
  outDir: "dist",
  port: 3000,
  open: false,
  https: false,
  ssr: false,
  proxy: {
    "/api": {
      target: "https://baidu.com/",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
};