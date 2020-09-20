/**
 * user 用户 model。
 */
import { Model, model, Document, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

export interface IUserModel extends IUser, Document {}

// 定义 用户的schema
const UserSchema: Schema = new Schema({
    nickName:{type:[String],index:true}, // 用户昵称  索引
	username: {type:[String],index:true},// 账号  索引
	passwd: String, // 密码
	email:String, // 邮箱
	mobilePhone:String,// 手机号
	createBy:String, // 创建者
	roles:Array, // 角色
	permissions:Array, // 权限
	createTime:{type:Date,default:Date.now}, // 创建时间
	updateTime:{type:Date,default:Date.now}, // 更新时间
});

/**
 * 把schema 编译为model，schema是model的抽象，而model是document的抽象， 每个document都是model的一个实例。
 * 
 * 当创建一个新的表时，先创建 schema ， 然后将schema编译为model ， 通过 new model 来创建一个 document作为model 的实例化。 
 * 每个document调用save来保存实例到数据库，保存的毁掉函数的第一个参数为error，第二个参数为保存后的实例。 document.save((error,document)=>{})
 * 
 * 实例可以添加方法， 方法必须添加到schema上， 方法必须在实例化为model之前添加到schema上。不能使用箭头函数。
*/
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
