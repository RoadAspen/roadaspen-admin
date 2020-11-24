/**
 *  user model，系统用户
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IUser {
    admin: boolean; // 是否是admin用户
    userName: string; // 用户名
    password:string; // 密码
    createBy: string; // 创建者
    createTime: string; // 创建时间
    updateBy: string; // 更新者
    updateTime: string; // 更新时间
    email: string; // 邮箱
    loginDate: string; //登录时间
    loginIp: string; // 登录IP
    nickName: string; // 用户昵称
    phoneNumber: string; // 手机号
    remark: string; // 备注
    roleIds: string; // 角色ID，逗号分隔
    roles: string[]; // 角色id
    sex: string; // 性别
    status: string; // 账号状态 1 正常 || 0 停用
    description: string; // 角色描述
    order: number; // 显示顺序, 排序
  }

export interface IUserModel extends IUser, Document {}



const UserSchema:Schema  = new Schema({
    admin:{type:Boolean,default:false}, // 是否是admin用户
    userName:{type:String,unique:true,required:true},// 用户名
    password:{type:String,required:true}, // 用户密码
    createBy:{type:Schema.Types.ObjectId,ref:'User'}, // 创建者
    createTime:{type:Date,default:Date.now}, // 创建时间
    email:{type:String}, // 邮箱
    loginDate:{type:String}, //登录时间
    loginIp:{type:String}, // 登录IP
    nickName:{type:String}, // 用户昵称
    phoneNumber:{type:String},// 手机号 
    remark:{type:String}, // 备注
    roles:[{type:Schema.Types.ObjectId,ref:'Role'}],// 角色id
    sex:{type:String}, // 性别
    status:{type:String,default:1},// 账号状态 1 正常 || 0 停用
    description:{type:String}, // 角色描述
    order:{type:Number,default:0}, // 显示顺序, 排序
    updateBy:{type:String},// 更新者
    updateTime:{type:Date,default:Date.now}, // 更新时间
});

export const User:Model<IUserModel> = model<IUserModel>("user",UserSchema,"user");
