/**
 *  menu 菜单管理
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IMenu {
  icon: string | null; // 图标
  isCache: boolean; // 是否缓存
  isFrame: boolean; // 是否外链
  menuName: string; // 菜单名称
  menuType: string; // 菜单类型
  menuOrder: number; // 显示排序
  parent: string | null; // 父菜单id
  path: string; // 路由  真实路由为 子路由和祖先路由的拼接
  component: string; // 组件路径
  permissionCode: string; // 权限编码
  remark: string | null; // 备注
  status: 0 | 1; // 状态 0 停用 1 正常
  createBy: string | null; // 创建者
  updateBy: string | null; // 更新者
}
export interface IMenuModel extends IMenu, Document {}

const MenuSchema: Schema = new Schema(
  {
    menuType: { type: String, required: true }, // 菜单类型
    menuName: { type: String, required: true }, // 菜单名称
    menuOrder: { type: Number, required: true }, // 显示排序
    parent: { type: Schema.Types.ObjectId, required: true,ref:'menu' }, // 父菜单id
    path: { type: String, required: true }, // 路由
    permissionCode: { type: String }, // 权限编码
    component: { type: String }, // 组件路径
    icon: { type: String }, // 图标
    isCache: { type: Boolean }, // 是否缓存
    isFrame: { type: Boolean, default: false }, // 是否外链
    status: { type: Number, default: 1 }, // 状态 0 停用 1 正常
    createBy: { type: Schema.Types.ObjectId,ref:'user' }, // 创建者id
    updateBy: { type: Schema.Types.ObjectId,ref:'user'}, // 更新者
    remark: { type: String }, // 备注
  },
  { timestamps: true }
);

export const Menu: Model<IMenuModel> = model<IMenuModel>(
  "menu",
  MenuSchema,
  "menu"
);
