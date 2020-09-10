import { ParameterizedContext } from "koa";
import { IRouterParamContext } from "koa-router";


/**
 * ctx 类型
 */
export type ICtx = ParameterizedContext<any, IRouterParamContext<any, {}>> ;



/**
 * 角色 信息类型 types
 */
export interface IRole {
	num: string; //学号
	name: string; //姓名
    gender: string; //性别
    room:string; // 班级
}

/**
 * 权限 信息类型 types
 */
export interface IPermission {
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