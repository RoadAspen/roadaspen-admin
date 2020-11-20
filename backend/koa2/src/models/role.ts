/**
 *  role 角色 model， admin 默认所有权限
 */

import { Model, model, Document, Schema } from "mongoose";

import { IRole } from "../interfaces/system";

export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema({
  roleName: String, // 角色名
  roleCode: { type: String, unique: true }, // 角色编码 默认唯一
  createBy: { type: String, default: null }, // 角色创建者
  description: String, // 角色描述
  order: Number, // 显示顺序, 排序
  status: { type: Number, default: 0 }, // 状态   0 正常 || 1 停用
  menus: { type: Array, default: [] }, // 角色菜单权限
  updated_at: { type: Date, default: Date.now }, // 更新时间
  remark: { type: String }, // 备注
});

export const Role: Model<IRoleModel> = model<IRoleModel>(
  "role",
  RoleSchema,
  "role"
);
