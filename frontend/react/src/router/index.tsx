// 导入 组件，使用懒加载
import Loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';
import React from 'react';
// 使用 react-router-config 来配置 react-router
// const Root = Loadable(() => import(/* webpackChunkName: "Root" */ '@/Root'));
const Main = Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Main'));
const Consumer = Loadable(() => import(/* webpackChunkName: "Consumer" */ '@/pages/system/Consumer'));
const Page404 = Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404'));
const Login = Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login'));
// eslint-disable-next-line react/prop-types
// react-route-config 必须使用根路由
const routes: RouteConfig = {
    routes: [
        {
            path: '/login',
            label: '登录',
            exact: true,
            component: Login,
        },
        {
            path: '/system',
            component: Main,
            routes: [
                {
                    path: '/system/user',
                    label: '用户管理',
                    exact: true,
                    component: Consumer,
                },
            ],
        },
        {
            path: '/',
            exact: true,
            render: () => <Redirect to='/login' />
        },
        {
            path: '/404',
            exact: true,
            component: Page404
        },
        {
            path: '*',
            render: () => <Redirect to="/404" />
        }
    ]
};

export default routes;
