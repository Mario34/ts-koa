class UserService {
  public async find() {
    return {
      userId: '2021',
      userNick: 'ts-koa',
    }
  }
}

export const userService = new UserService()