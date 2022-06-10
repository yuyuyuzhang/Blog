import vue from '@vitejs/plugin-vue'
import path from 'path'

const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': pathResolve('./src')
    },
  }
}
