/**
 *  user model，系统用户
 */

import { Model, model, Document, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

export interface IUserModel extends IUser, Document {}

const UserSchema:Schema  = new Schema({
    admin:Boolean, // 是否是admin用户
    userName:String,// 用户名
    userId:{type:Number,unique:true},// 用户id 默认唯一
    createBy:{type:String,default:null}, // 创建者
    createTime:{type:Date,default:Date.now}, // 创建时间
    email:String, // 邮箱
    loginDate:String, //登录时间
    loginIp:String, // 登录IP
    nickName:String, // 用户昵称
    phoneNumber:String,// 手机号 
    remark:String, // 备注
    roleIds:{type:String,default:null},// 角色ID，逗号分隔
    roles:{type:Array,default:[]},// 角色id
    sex:String, // 性别
    status:String,// 账号状态 0 正常 || 1 停用
    description:String, // 角色描述
    order:Number, // 显示顺序, 排序
    updateBy:String,// 更新者
    updateTime:{type:Date,default:Date.now}, // 更新时间
});

export const User:Model<IUserModel> = model<IUserModel>("User",UserSchema);
