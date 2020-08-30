/**
 * 仿照react-router-config ，中心配置模式，添加权限验证以及多重路由匹配
 */

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { RouteAuthConfig } from "@/types/renderRoutes";

function renderRoutes(routes: RouteAuthConfig[], authPath = "/login", extraProps = {}, switchProps = {}) {

    return routes ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    render={(props) => {
                        // 如果 路由需要不需要登录
                        if(!route.requiresAuth) {
                            return <route.Component {...props} {...extraProps} route={route} />
                        }
                        // 否则直接返回登录页面
                        return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
                    }}
                />
            ))}
        </Switch>

    ) : null;
}
export default renderRoutes;
