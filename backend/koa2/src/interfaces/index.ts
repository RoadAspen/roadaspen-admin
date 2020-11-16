import { ParameterizedContext } from "koa";
import { IRouterParamContext } from "koa-router";


/**
 * ctx 类型
 */
export type ICtx = ParameterizedContext<any, IRouterParamContext<any, {}>> ;

