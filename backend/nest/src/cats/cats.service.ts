import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cats.interface';

// 服务，在这里对数据进行增删改查

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}