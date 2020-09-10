/**
 * user 用户 model。
 */
import { Model, model, Document, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    nickName:String, // 用户昵称
	username: String,// 账号
	passwd: String, // 密码
	email:String, // 邮箱
	mobilePhone:String,// 手机号
	createBy:String, // 创建者
	roles:Array, // 角色
	permissions:Array, // 权限
	createTime:Date, // 创建时间
	updateTime:Date, // 更新时间
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
