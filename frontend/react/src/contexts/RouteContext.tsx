/**
 * 用于存储用户路由的context。
 * 当用户登录成功时，需要获取当前用户的路由及权限，根据路由和当前路由做整合，并对路由做出改变
 */
import React, { useReducer } from 'react';
import routes from '@/router/index';
import { RouteConfig } from 'react-router-config';

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
