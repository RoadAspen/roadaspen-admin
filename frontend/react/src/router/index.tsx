// 导入 组件，使用懒加载
import Loadable from '@loadable/component';
// import Login from '@/layouts/Login';
// import Main from '@/layouts/Main';
// import Consumer from '@/pages/main/Consumer';
// import Root from '@/Root';
// import Page404 from '@/layouts/404';
// import React from 'react';
import { RouteConfig } from 'react-router-config';
// 使用 react-router-config 来配置 react-router
const Login = Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login'));
const Root = Loadable(() => import(/* webpackChunkName: "Root" */ '@/Root'));
const Main = Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Main'));
const Consumer = Loadable(() => import(/* webpackChunkName: "Consumer" */ '@/pages/main/Consumer'));
const Page404 = Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404'));
// eslint-disable-next-line react/prop-types
const routes: RouteConfig[] = [
    {
        component: Root,
        path: '/',
        routes: [
            {
                path: '/',
                exact: true,
                component: Login,
            },
            {
                path: '/login',
                exact: true,
                component: Login,
            },
            {
                path: '/main',
                component: Main,
                routes: [
                    {
                        path: '/main/consumer',
                        exact: true,
                        component: Consumer,
                    },
                ],
            },
            {
                path: '*',
                component: Page404,
            },
        ],
    },
];

export default routes;
