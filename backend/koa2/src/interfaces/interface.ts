import { ParameterizedContext } from "koa";
import { IRouterParamContext } from "koa-router";


/**
 * ctx 类型
 */
export type ICtx = ParameterizedContext<any, IRouterParamContext<any, {}>> ;



/**
 * 学生 信息类型 types
 */
export interface IStudent {
	num: string; //学号
	name: string; //姓名
    gender: string; //性别
    room:string; // 班级
}

/**
 * 教师 信息类型 types
 */
export interface ITeacher {
	num: string; //学号
	name: string; //姓名
    gender: string; //性别
    room:string; // 班级
}


/**
 *  user 用户登录信息表
 */
export interface IUser {
    name:string; //用户昵称
	username: string;// 用户账号
	passwd: string;// 用户密码
}