// 导入 组件，使用懒加载
import Loadable from '@loadable/component';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';
import React from 'react';
import Cookies from 'js-cookie';
import Loading from '@/components/Loading';

// react-route-config , 白名单，如果需要返回上一页并保持退出的状态，则需要把页面的状态信息都存入到redux或者context中
const routes: RouteConfig = {
    routes: [
        {
            path: '/',
            exact: true,
            hidden: true,
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
            hidden: true,
            exact: true,
            component: Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login'), {
                fallback: <Loading />,
            }),
        },
        {
            path: '/main',
            label: '主页面',
            hidden: true,
            component: Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Main'), {
                fallback: <Loading />,
            }),
            routes: [
                {
                    // 当进入main时，如果没有已有的redirect，则默认跳转到 index
                    path: '/main',
                    exact: true,
                    render() {
                        return <Redirect to='/main/index' />;
                    },
                },
                {
                    path: '/main/index',
                    exact: true,
                    component: Loadable(
                        () => import(/* webpackChunkName: "Consumer" */ '@/pages/index/Index'),
                        {
                            fallback: <Loading />,
                        }
                    ),
                },
                {
                    path: '/main/system',
                    label: '系统',
                    exact: true,
                    render() {
                        //
                        return <Redirect to='/main/system/user' />;
                    },
                    routes: [
                        {
                            path: '/main/system/user',
                            label: '用户管理',
                            exact: true,
                            component: Loadable(
                                () =>
                                    import(
                                        /* webpackChunkName: "Consumer" */ '@/pages/system/Consumer'
                                    ),
                                {
                                    fallback: <Loading />,
                                }
                            ),
                        },
                        {
                            // 如果都没匹配到，就重定向到 /system/user
                            path: '/main/system/user',
                            exact: true,
                            render() {
                                return <Redirect to='/main/system/user' />;
                            },
                        },
                    ],
                },
            ],
        },
        {
            // 如果未找到，就转至404
            path: '*',
            exact: true,
            label: '404',
            component: Loadable(() => import(/* webpackChunkName: "Page404" */ '@/layouts/404'), {
                fallback: <Loading />,
            }),
        },
    ],
};
export default routes;
