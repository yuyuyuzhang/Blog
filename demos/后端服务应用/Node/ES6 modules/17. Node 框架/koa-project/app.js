import Koa from 'koa';
import views from 'koa-views';
import Static from 'koa-static';

import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

import path from 'path';
import index from './routes/index.js'

const dirname = path.resolve() // 返回当前工作目录的绝对路径，类似于 commonJS 中的 __dirname 全局变量

const app = new Koa()

// 服务器产生错误时，包括之后的中间件抛出错误，都自动重定向到指定路径
onerror(app, {
  redirect: '/error'
})

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())


// 配置视图，支持 ejs 模板引擎
app.use(views(dirname + '/views', {
  extension: 'ejs'
}))

// 配置静态资源文件访问
app.use(Static(dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app;