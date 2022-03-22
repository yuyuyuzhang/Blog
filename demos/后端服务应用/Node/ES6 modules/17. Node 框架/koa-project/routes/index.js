import KoaRouter from 'koa-router'

const router = KoaRouter()

// router.prefix('/v1') // 设置路由前缀

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// cache
router.get('/local-cache', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
router.get('/redis-cache', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/both-cache', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// test
router.get('/test1?name=a', async (ctx, next) => {
  console.log('query', ctx.query)
  const query = ctx.query; // 获取 GET 参数
  ctx.body = {
    title: 'koa2 json'
  }
})
router.post('/test2', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

function a () {
  return async function ( ctx, next ) {
      // 获取 get 参数
      const myUrl = new URL(ctx.request.url, `http://${ctx.request.headers.host}`); 
      const pathname = myUrl.pathname;
      
      // 过滤非拉取用户信息请求
      if(!routerMapping[pathname]) {
          baseFun.setResInfo(ctx, false, 'path ', null, 404);
          return await next();
      }
      // require 对应的 controller 类
      const ControllerClass = require(`../controller/${routerMapping[pathname]['controller']}`);

      try { // 尝试调用类中的方法
          const controllerObj = new ControllerClass(ctx);
          if(controllerObj[
              routerMapping[pathname]['method']
          ][
              Symbol.toStringTag
          ] === 'AsyncFunction') { // 判断是否为异步 promise 方法，如果是则使用 await
              await controllerObj[routerMapping[pathname]['method']]();
              return await next();
          } else { // 普通方法则直接调用
              return controllerObj[routerMapping[pathname]['method']]();
          }
      } catch (error) { // 异常时，需要返回 500 错误码给前端
          console.log(error);
          baseFun.setResInfo(ctx, false, 'server error', null, 500);
          return await next();
      }
  }
}

export default router;