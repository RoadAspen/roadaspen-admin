// 导入 组件，使用懒加载
import Loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';
import React from 'react';
// 使用 react-router-config 来配置 react-router
// const Root = Loadable(() => import(/* webpackChunkName: "Root" */ '@/Root'));
const Main = Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Main'));
// const Consumer = Loadable(() => import(/* webpackChunkName: "Consumer" */ '@/pages/main/Consumer'));
// const Page404 = Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404'));
// eslint-disable-next-line react/prop-types
// react-route-config 必须使用根路由
const routes: RouteConfig = {
    routes: [
        {
            path: '/',
            exact: true,
            render: () => <Redirect to='/login' />
        },
        {
            path: '/login',
            exact: true,
            component: Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login')),
        },
        {
            path: '/main',
            render: () => { return <Redirect to='/main/consumer' /> },
            routes: [
                {
                    path: '/consumer',
                    exact: true,
                    component: Main,
                },
            ],
        },
        {
            path: '*',
            component: Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404')),
        },
    ]
};

export default routes;
