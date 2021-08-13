import Koa from 'koa'
import * as allController from './controller'
import { initController } from './core/instance'
import Router from 'koa-router'

const app = new Koa()

export const router = new Router()

initController(app, router, Object.values(allController) )

app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx, next) => {
  try {
    await next()
    if (!ctx.body) { // 没有资源
      ctx.status = 404
      ctx.body = { code: 404, msg: 'Not Found' }
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = '500'
  }
})

app.listen(3000)