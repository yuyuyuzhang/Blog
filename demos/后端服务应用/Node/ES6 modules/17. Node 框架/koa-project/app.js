import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import index from './routes/index.js'

const app = new Koa()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// routes
app.use(index.routes(), index.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app;