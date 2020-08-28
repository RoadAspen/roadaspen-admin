/**
 * user 用户 model。
 */
import { Model, model, Document, Schema } from "mongoose";

import { IUser } from "../interfaces/interface";

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    name:String, // 用户昵称
	username: String,// 账号
	passwd: String, // 密码
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
