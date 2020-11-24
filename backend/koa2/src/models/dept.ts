/**
 * dept 部门 表
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IDept {
    component: string; // 组件路径
    createBy: string | null; // 创建者id
    createTime: string | null; //创建时间
    icon: string | null; // 图标
    isCache: boolean; // 是否缓存
    isFrame: boolean; // 是否外链
    menuId: number; // 菜单id
    menuName: string; // 菜单名称
    menuType: string; // 菜单类型
    menuOrder: number; // 显示排序
    parent:string | null; // 父菜单名称
    path: string; // 路由
    perms: string; // 权限编码
    remark: string | null; // 备注
    status: number; // 状态 0 停用 1 正常
    updateBy: string | null; // 更新者
    updateTime: string | null; // 更新时间
  }
export interface IDeptModel extends IDept, Document {}

const DeptSchema:Schema  = new Schema({
    menuName:{type: String,required:true}, // 菜单名称
    menuType:{type: String,required:true}, // 菜单类型
    menuOrder:{type: Number,required:true}, // 显示排序
    parent:{type:Schema.Types.ObjectId,required:true,ref:'Menu'}, // 父菜单id
    path:{type: String,required:true}, // 路由
    perms:{type: String}, // 权限编码
    component:{type: String}, // 组件路径
    createBy:{type: Schema.Types.ObjectId,ref:'User'}, // 创建者 外链至 User表
    createTime:{type: String}, //创建时间
    icon:{type: String}, // 图标
    isCache:{type: Boolean}, // 是否缓存
    isFrame:{type: Boolean}, // 是否外链
    remark:{type: String}, // 备注
    status:{type: Number,default:1}, // 状态 0 停用 1 正常
    updateBy:{type: String}, // 更新者
    updateTime:{type: String}, // 更新时间
});

export const Dept:Model<IDeptModel> = model<IDeptModel>("dept",DeptSchema,"dept");