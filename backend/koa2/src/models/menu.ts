/**
 *  menu 菜单管理
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IMenu {
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
    status: 0 | 1; // 状态 0 停用 1 正常
    updateBy: string | null; // 更新者
    updateTime: string | null; // 更新时间
  }
export interface IMenuModel extends IMenu, Document {}

const MenuSchema:Schema  = new Schema({
    menuName:{type: String}, // 菜单名称
    menuType:{type: String}, // 菜单类型
    menuOrder:{type: Number}, // 显示排序
    parent:{type:String}, // 父菜单名称
    path:{type: String}, // 路由
    perms:{type: String}, // 权限编码
    component:{type: String}, // 组件路径
    createBy:{type: String}, // 创建者id
    createTime:{type: String}, //创建时间
    icon:{type: String}, // 图标
    isCache:{type: Boolean}, // 是否缓存
    isFrame:{type: Boolean}, // 是否外链
    remark:{type: String}, // 备注
    status:{type:Number,default:1}, // 状态 0 停用 1 正常
    updateBy:{type: String}, // 更新者
    updateTime:{type: String}, // 更新时间
});

export const Menu:Model<IMenuModel> = model<IMenuModel>("menu",MenuSchema,"menu");