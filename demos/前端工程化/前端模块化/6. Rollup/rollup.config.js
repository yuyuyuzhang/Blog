// export default {
//   input: 'src/index.js',
//   output: {
//     file: 'dist/bundle.js', //输出文件名
//     format: 'es' // 输出格式
//   }
// }


// 所有 Rollup 支持的格式
// const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
// export default formats.map(format => ({
//   input: 'src/index.js',
//   output: {
//     file: `dist/bundle.${format}.js`,
//     format
//   }
// }))


// 插件
// import json from '@rollup/plugin-json'
// import resolve from '@rollup/plugin-node-resolve'
// export default {
//   input: 'src/index.js',
//   output: {
//     file: 'dist/bundle.js',
//     format: 'es'
//   },
//   plugins: [
//     json(),
//     resolve()
//   ]
// }

// 动态加载模块，输出多个 JS 文件
// import json from '@rollup/plugin-json'
// import resolve from '@rollup/plugin-node-resolve'
// export default {
//   input: 'src/index.js',
//   output: {
//     dir: 'dist_more', //输出目录
//     format: 'es'
//   },
//   plugins: [
//     json(),
//     resolve()
//   ]
// }


//动态加载模块，兼容低版本浏览器
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist_more_amd', //输出目录
    format: 'amd'
  },
  plugins: [
    json(),
    resolve()
  ]
}