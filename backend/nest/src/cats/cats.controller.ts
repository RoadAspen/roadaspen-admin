import { Controller, Post, Get, Body, Query, Param, Put, Delete } from '@nestjs/common';
import { CreateCatDto} from './dto/cats.dto'
import { CatsService } from './cats.service';
import { Cat } from './interface/cats.interface';

// controller 负责把 service 和 路径映射

@Controller('cats')
export class CatsController{

  constructor(private catsService: CatsService) {}
    // @Post 创建 post
  @Post()
  async create(@Body() createCatDto:CreateCatDto){
    this.catsService.create(createCatDto);
  }
  // @Get 装饰器时告诉 Nest 为HTTP请求的特定端点创建处理程序
  // Get 时将 方法和路径做一个映射，可以传参，如 @Get('list')  会映射成为 get /cats/list  findAll
  @Get()
  async  findAll():Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

}