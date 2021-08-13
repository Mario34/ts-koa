import { MetaKey } from './decorator'

import type { RouterMethod } from './decorator'
import type Router from 'koa-router'
import type Koa from 'koa'

export const initController = (app: Koa, router: Router, allController: any[]): void => {
  // 过滤非controller类
  const controllers = allController.filter(c => {
    return Reflect.getMetadata(MetaKey.CONTROLLER, c)
  })

  controllers.forEach(C => {
    const instance = new C()
    const routes = mapRoute(instance)
    routes.forEach(item => {
      router[item.method](item.prefix + item.route, ...item.middleware, item.fn.bind(instance))
      console.warn(item.prefix + item.route, '=>', `${item.constructor.name}.${item.methodName}`)
    })
  })
}

function mapRoute(instance: Record<string, unknown>) {
  const prototype = Object.getPrototypeOf(instance)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(item => {
    return Reflect.getMetadata(MetaKey.ROUTER, prototype[item]) !== undefined
  })
  return methodsNames.map(methodName => {
    const fn = prototype[methodName]
    const middleware: Router.IMiddleware[] = Reflect.getMetadata(MetaKey.MIDDLEWARE, fn) || []
    const prefix: string = Reflect.getMetadata(MetaKey.PREFIX, prototype.constructor)
    const route: string = Reflect.getMetadata(MetaKey.ROUTER, fn)
    return {
      fn,
      route,
      prefix,
      methodName,
      middleware,
      method: Reflect.getMetadata(MetaKey.METHOD, fn) as RouterMethod,
      constructor: prototype.constructor,
    }
  })
}