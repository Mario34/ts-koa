import { Controller, Get, All } from '../core/decorator'
import { userService } from '../service'

import type KR from 'koa-router'

@Controller('/user')
export class UserController {
  @Get('/detail')
  public async getUser(ctx: KR.RouterContext): Promise<void> {
    ctx.body = await userService.find()
  }

  @All('/login')
  public async login(ctx: KR.RouterContext): Promise<void> {
    ctx.body = await userService.find()
  }
}
