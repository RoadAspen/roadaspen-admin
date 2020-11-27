/**
 *  user model，系统用户
 */

import { Model, model, Document, Schema } from "mongoose";

export interface IUser {
  admin: boolean; // 是否是admin用户
  nickName: string; // 用户昵称
  userName: string; // 用户名
  password: string; // 密码
  email: string; // 邮箱
  loginDate: string; //登录时间
  loginIp: string; // 登录IP
  phoneNumber: string; // 手机号
  roles: string[]; // 角色id
  sex: string; // 性别
  status: string; // 账号状态 1 正常 || 0 停用
  order: number; // 显示顺序, 排序
  createBy: string; // 创建者
  updateBy: string; // 更新者
  remark: string; // 备注
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    admin: { type: Boolean, default: false }, // 是否是admin用户
    userName: { type: String, unique: true, required: true }, // 用户名
    password: { type: String, required: true }, // 用户密码
    email: { type: String }, // 邮箱
    loginDate: { type: String }, //登录时间
    loginIp: { type: String }, // 登录IP
    nickName: { type: String }, // 用户昵称
    phoneNumber: { type: String }, // 手机号
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }], // 角色id
    sex: { type: String }, // 性别
    status: { type: String, default: 1 }, // 账号状态 1 正常 || 0 停用
    order: { type: Number, default: 0 }, // 显示顺序, 排序
    createBy: { type: Schema.Types.ObjectId, ref: "User" }, // 创建者
    updateBy: { type: String }, // 更新者
    remark: { type: String }, // 备注
  },
  { timestamps: true }
);

export const User: Model<IUserModel> = model<IUserModel>(
  "user",
  UserSchema,
  "user"
);
