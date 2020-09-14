import { ParameterizedContext } from "koa";
import { IRouterParamContext } from "koa-router";


/**
 * ctx 类型
 */
export type ICtx = ParameterizedContext<any, IRouterParamContext<any, {}>> ;

/**
 *  user 用户登录信息表
 */
export interface IUser {
    name:string; //用户昵称
	username: string;// 用户账号
	passwd: string;// 用户密码
}