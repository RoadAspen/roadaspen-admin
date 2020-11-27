/**
 *  role 角色 model， admin 默认所有权限
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IRole {
  roleCode: string; // 角色编码
  roleName: string; // 角色名称
  roleOrder: number; // 角色排序
  admin: boolean; // 是否为 admin 角色
  createBy: string | null; // 创建者
  status: number; // 状态 1 正常 0 停用
  menus: string[]; // 菜单id数组
  depts: string[]; // 部门 id 数组
  remark: string | null; // 角色备注
  updateBy: string | null; // 更新者
}
export interface IRoleModel extends IRole, Document {}

const RoleSchema: Schema = new Schema(
  {
    roleCode: { type: String, unique: true, required: true }, // 角色编码 默认唯一
    roleName: { type: String }, // 角色名
    roleOrder: { type: Number }, // 角色显示顺序, 排序
    admin: { type: Boolean }, // 是否是admin
    createBy: { type: Schema.Types.ObjectId, ref: "User" }, // 角色创建者
    status: { type: Number, default: 1 }, // 状态   1 正常 || 0 停用
    menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }], // 角色菜单权限
    depts: [{ type: Schema.Types.ObjectId, ref: "Dept" }], // 部门id
    updateBy: { type: Schema.Types.ObjectId, ref: "User" }, // 更新者
    description: String, // 角色描述
    remark: { type: String }, // 备注
  },
  { timestamps: true }
);

export const Role: Model<IRoleModel> = model<IRoleModel>(
  "role",
  RoleSchema,
  "role"
);
