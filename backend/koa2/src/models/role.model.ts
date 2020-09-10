/**
 *  role 角色 model， admin 默认所有权限
 */

import { Model, model, Document, Schema } from "mongoose";

import { IRole } from "../interfaces/role.interface";

export interface IRoleModel extends IRole, Document {}

const RoleSchema:Schema  = new Schema({
    name:String,// 角色名
    code:String,// 角色编码
    description:String, // 角色描述
    order:Number, // 显示顺序
    status:Number, // 状态   启用 || 停用 || 失效
    created_at:Date, // 创建时间
    updated_at:Date, // 更新时间
});

export const Role:Model<IRoleModel> = model<IRoleModel>("Role",RoleSchema);
