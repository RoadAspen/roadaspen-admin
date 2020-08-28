/**
 *  teacher 老师 model
 */

import { Model, model, Document, Schema } from "mongoose";

import { ITeacher } from "../interfaces/interface";

export interface ITeacherModel extends ITeacher, Document {}

const TeacherSchema:Schema  = new Schema({
    num:String, // 学号
    name:String,// 姓名
    gender:String,// 性别
    room:String, // 班级
});

export const Teacher:Model<ITeacherModel> = model<ITeacherModel>("Teacher",TeacherSchema);