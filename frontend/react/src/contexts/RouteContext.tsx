/**
 * 用于存储用户路由的context。
 * 当用户登录成功时，需要获取当前用户的路由及权限，根据路由和当前路由做整合，并对路由做出改变
 */
import React, { useReducer } from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Loading from '@/components/Loading';
import Loadable from '@loadable/component';

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
            component: Loadable(() => import(/* webpackChunkName: "Login" */ '@/layouts/Login'), {
                fallback: <Loading />,
            }),
        },
        {
            path: '/system',
            label: '系统管理',
            hidden: true,
            component: Loadable(() => import(/* webpackChunkName: "Main" */ '@/layouts/Layout'), {
                fallback: <Loading />,
            }),
            routes: [
                {
                    // 当进入system时，如果没有已有的redirect，则默认跳转到 user
                    path: '/system',
                    exact: true,
                    render() {
                        return <Redirect to='/system/user' />;
                    },
                },
                {
                    path: '/system/user',
                    exact: true,
                    label: '用户管理',
                    component: Loadable(
                        () => import(/* webpackChunkName: "Consumer" */ '@/pages/system/user'),
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
                                        /* webpackChunkName: "Consumer" */ '@/pages/system/user'
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

type ContextType = [RouteConfig, React.Dispatch<Action>];

export const RouteConfigContext = React.createContext<ContextType>({} as ContextType);

const RouteConfigProvider = (props: { children: React.ReactNode }) => {
    // prettier-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <RouteConfigContext.Provider value={[state, dispatch]}>
            {props.children}
        </RouteConfigContext.Provider>
    );
};
export default RouteConfigProvider;
