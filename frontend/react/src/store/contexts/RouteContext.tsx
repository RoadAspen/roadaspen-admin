/**
 * 用于存储用户路由的context。
 * 当用户登录成功时，需要获取当前用户的路由及权限，根据路由和当前路由做整合，并对路由做出改变
 */
import React, { useReducer } from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Loading from '@/components/loading';
import Loadable from '@loadable/component';

const Page404 = Loadable(() => import(/* webpackChunkName: "Page404" */ '@/pages/404'), {
    fallback: <Loading />,
});

const Login = Loadable(() => import(/* webpackChunkName: "Login" */ '@/pages/login'), {
    fallback: <Loading />,
});
const Layout = Loadable(() => import(/* webpackChunkName: "Layout" */ '@/layout'), {
    fallback: <Loading />,
});
const User = Loadable(() => import(/* webpackChunkName: "User" */ '@/pages/system/user'), {
    fallback: <Loading />,
});
// 初始化路由
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
            component: Login,
        },
        {
            path: '/system',
            label: '系统管理',
            icon: '',
            hidden: false,
            component: Layout,
            routes: [
                {
                    path: '/system/user',
                    exact: true,
                    icon: '',
                    hidden: false,
                    label: '用户管理',
                    component: User,
                },
                {
                    // 如果未找到，就转至404
                    path: '*',
                    hidden: true,
                    render() {
                        return <Redirect to='/404' />;
                    },
                },
            ],
        },
        {
            path: '/monitor',
            label: '系统告警',
            icon: '',
            component: Layout,
            routes: [
                {
                    path: '/monitor/user',
                    exact: true,
                    icon: '',
                    label: '用户管理',
                    component: User,
                },
                {
                    // 如果未找到，就转至404
                    path: '*',
                    hidden: true,
                    render() {
                        return <Redirect to='/404' />;
                    },
                },
            ],
        },
        {
            // 如果未找到，就转至404
            path: '*',
            label: '404',
            hidden: true,
            component: Page404,
        },
    ],
};

const initialState: RouteConfig = routes;

type Action = { type: 'update'; payload: Partial<RouteConfig> };

// 创建修改菜单的reducer
function reducer(state: RouteConfig, action: Action): RouteConfig {
    //  执行了修改
    console.log(state);
    switch (action.type) {
        case 'update':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return { ...state };
    }
}

type ContextType = { routes: RouteConfig; dispatchRoutes: React.Dispatch<Action> };

export const RouteConfigContext = React.createContext<ContextType>({} as ContextType);

const RouteConfigProvider = (props: { children: React.ReactNode }) => {
    // prettier-ignore
    const [routes, dispatchRoutes] = useReducer(reducer, initialState);
    return (
        <RouteConfigContext.Provider value={{ routes, dispatchRoutes }}>
            {props.children}
        </RouteConfigContext.Provider>
    );
};
export default RouteConfigProvider;
