import KoaRouter from 'koa-router'

const router = KoaRouter()

// login
router.get('/login', async (ctx, next) => {
  console.log("resbody:", ctx.req.body)

  // require 对应的 controller 类
  const ControllerClass = import('../controller/login.js');

  // 尝试调用类中的方法
  try { 
      const controllerObj = new ControllerClass(ctx);

      // 判断是否为异步 promise 方法，如果是则使用 await
      if(controllerObj.login[Symbol.toStringTag] === 'AsyncFunction') {
          await controllerObj.login();
          return await next();
      } else {
          return controllerObj.login();
      }
  } catch (error) { 
      // 异常时返回 500 错误码给前端
      console.log(error);
      return await next();
  }
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

export default router;