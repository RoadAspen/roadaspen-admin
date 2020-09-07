import { Controller, Post, Get } from "@nestjs/common";

@Controller()
export class CatsController{
    // @Post 创建 post
  @Post()
  create():string{
      return 'this action return a new cat'
  }
  // @Get 装饰器时告诉 Nest 为HTTP请求的特定端点创建处理程序
  // Get 时将 方法和路径做一个映射，可以传参，如 @Get('list')  会映射成为 get /cats/list  findAll
  @Get('list')
  findAll():string{
      return 'this action return all cats'
  }
}