/**
 *  student 学生 model，权限默认为 选课、查看自己选课
 */

import { Model, model, Document, Schema } from "mongoose";

import { IStudent } from "../interfaces/interface";

export interface IStudentModel extends IStudent, Document {}

const StudentSchema:Schema  = new Schema({
    num:String, // 学号
    name:String,// 姓名
    gender:String,// 性别
    room:String, // 班级
});

export const Student:Model<IStudentModel> = model<IStudentModel>("Student",StudentSchema);
