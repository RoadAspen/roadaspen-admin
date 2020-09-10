import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// provider 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 服务提供者
// controller 必须创建的一组控制器
// imports 从其他模块导入
// exports 从本模块导出,可以在别的controller中操作 本模块的服务
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports:[CatsService]
})
export class CatsModule {}
