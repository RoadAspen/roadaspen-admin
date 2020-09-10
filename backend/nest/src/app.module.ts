import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.modules';

// provider 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 服务提供者
// controller 必须创建的一组控制器
// imports 从其他模块导入
// exports 从本模块导出
@Module({
  imports: [CatsModule]
})
export class AppModule {}
