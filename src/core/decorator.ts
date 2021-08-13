import 'reflect-metadata'

import type Router from 'koa-router'

export type RouterMethod = 'get' | 'post' | 'put' | 'patch' | 'del' | 'options' | 'all'

export enum MetaKey {
  'PREFIX',
  'CONTROLLER',
  'ROUTER',
  'MIDDLEWARE',
  'METHOD',
}

export const Controller = (prefix = ''): ClassDecorator => {
  return (target): void => {
    Reflect.defineMetadata(MetaKey.PREFIX, prefix, target)
    Reflect.defineMetadata(MetaKey.CONTROLLER, true, target)
  }
}

export const GRouter = (method: RouterMethod) => {
  return (path = '', ...middleware: Router.IMiddleware[]): MethodDecorator => {
    return (target, key, descriptor): void => {
      Reflect.defineMetadata(MetaKey.METHOD, method, descriptor.value as Record<string, unknown>)
      Reflect.defineMetadata(MetaKey.MIDDLEWARE, middleware, descriptor.value as Record<string, unknown>)
      Reflect.defineMetadata(MetaKey.ROUTER, path, descriptor.value as Record<string, unknown>)
    }
  }
}

export const Get = GRouter('get')
export const Post = GRouter('post')
export const Put = GRouter('put')
export const Patch = GRouter('patch')
export const Del = GRouter('del')
export const Option = GRouter('options')
export const All = GRouter('all')
