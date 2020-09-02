import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 控制器， 负责处理传入的请求和向客户端返回响应。
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
