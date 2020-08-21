import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

// 导入其他类型资源
import './style.css'

// 导入 .md 文件
import title from './title.md'

// 添加 textarea 输入框
const text = document.createElement('textarea')
document.body.append(text)