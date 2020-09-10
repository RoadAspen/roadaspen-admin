/**
 *  Permission 权限 model
 */

import { Model, model, Document, Schema } from "mongoose";

import { IPermission } from "../interfaces/permission.interface";

export interface IPermissionModel extends IPermission, Document {}

const PermissionSchema:Schema  = new Schema({
    num:String, // 学号
    name:String,// 姓名
    gender:String,// 性别
    room:String, // 班级
});

export const Permission:Model<IPermissionModel> = model<IPermissionModel>("Permission",PermissionSchema);