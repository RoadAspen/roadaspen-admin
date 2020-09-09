// 导入 组件，使用懒加载
import Loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';
import React from 'react';
import Cookies from 'js-cookie';
import Loading from '@/components/Loading';
// 使用 react-router-config 来配置 react-router
// const Root = Loadable(() => import(/* webpackChunkName: "Root" */ '@/Root'));
const Main = Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Main'), {
    fallback: <Loading />,
});
const Consumer = Loadable(
    () => import(/* webpackChunkName: "Consumer" */ '@/pages/system/Consumer'),
    {
        fallback: <Loading />,
    }
);
const Page404 = Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404'), {
    fallback: <Loading />,
});
const Login = Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login'), {
    fallback: <Loading />,
});
// eslint-disable-next-line react/prop-types
// react-route-config , 白名单
const routes: RouteConfig = {
    routes: [
        {
            path: '/',
            exact: true,
            render: () => {
                // 根据是否存在token，来判断跳转
                if (Cookies.get('token') !== undefined) {
                    return <Redirect to={'/system'} />;
                } else {
                    return <Redirect to={'/login'} />;
                }
            },
        },
        {
            path: '/login',
            label: '登录',
            exact: true,
            component: Login,
        },
        {
            path: '/system',
            label: '系统',
            component: Main, //在 main中获取
            routes: [
                {
                    path: '/system/user',
                    label: '用户管理',
                    exact: true,
                    component: Consumer,
                },
                {
                    // 如果都没匹配到，就重定向到 /system/user
                    path: '/system',
                    exact: true,
                    render() {
                        return <Redirect to='/system/user' />;
                    },
                },
            ],
        },
        {
            // 如果未找到，就转至404
            path: '*',
            exact: true,
            label: '404',
            component: Page404,
        },
    ],
};

export default routes;
