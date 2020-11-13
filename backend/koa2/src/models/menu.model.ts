/**
 *  menu 菜单管理
 */

import { Model, model, Document, Schema } from "mongoose";

import { IMenu } from "../interfaces/menu.interface";

export interface IMenuModel extends IMenu, Document {}

const MenuSchema:Schema  = new Schema({
    num:String, // 学号
    name:String,// 姓名
    gender:String,// 性别
    room:String, // 班级
});

export const Menu:Model<IMenuModel> = model<IMenuModel>("Menu",MenuSchema);