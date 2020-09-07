// 创建 接受参数

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

export class UpdateCatDto {
  name: string;
  age: number;
  breed: string;
}

export class ListAllEntities {
  page: number;
  page_size: number;
  name: string;
}