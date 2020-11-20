/**
 *  user model，系统用户
 */

import { Model, model, Document, Schema } from "mongoose";

import { IUser } from "../interfaces/system";

export interface IUserModel extends IUser, Document {}

const UserSchema:Schema  = new Schema({
    admin:{type:Boolean,default:false}, // 是否是admin用户
    userName:{type:String,unique:true,required:true},// 用户名
    password:{type:String,required:true}, // 用户密码
    userId:{type:Number,unique:true},// 用户id 默认唯一
    createBy:{type:String,default:null}, // 创建者
    createTime:{type:Date,default:Date.now}, // 创建时间
    email:{type:String}, // 邮箱
    loginDate:{type:String}, //登录时间
    loginIp:{type:String}, // 登录IP
    nickName:{type:String}, // 用户昵称
    phoneNumber:{type:String},// 手机号 
    remark:{type:String}, // 备注
    roleIds:{type:String,default:null},// 角色ID，逗号分隔
    roles:{type:Array,default:[]},// 角色id
    sex:{type:String}, // 性别
    status:{type:String,default:0},// 账号状态 0 正常 || 1 停用
    description:{type:String}, // 角色描述
    order:{type:Number,default:0}, // 显示顺序, 排序
    updateBy:{type:String},// 更新者
    updateTime:{type:Date,default:Date.now}, // 更新时间
});

export const User:Model<IUserModel> = model<IUserModel>("user",UserSchema,"user");
