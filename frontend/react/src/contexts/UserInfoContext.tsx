/**
 * 局用户信息管理,当登录成功，将用户账号记入cookies和localstorage，
 * 渲染main时，需要请求后台，返回用户信息以及权限信息，
 * 此表为存储用户信息的context
 */
import React, { useReducer } from 'react';

interface UserInfo {
    user: {
        admin: boolean; // 是否是 admin账号
        createBy: string; // 创建该账号的账号
        createTime: string; // 创建时间
        sex: string; // 性别
        status: boolean; //  该账号是否启用
        loginDate: string; // 登录日期
    };
    roles: string[];
    permissions: string[];
}

const initialState: UserInfo = {
    user: {
        admin: false, // 是否是 admin账号
        createBy: '', // 创建该账号的账号
        createTime: '', // 创建时间
        sex: '', // 性别
        status: false, //  该账号是否启用
        loginDate: '', // 登录日期
    },
    roles: [],
    permissions: [],
};

type Action = { type: string; payload: Partial<UserInfo> };

// 创建修改 用户信息 的reducer
function reducer(state: UserInfo, action: Action): UserInfo {
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

type ContextType = [UserInfo, React.Dispatch<Action>];

export const UserInfoContext = React.createContext<ContextType>({} as ContextType);

const UserInfoContextProvider = (props: { children: React.ReactNode }) => {
    // prettier-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserInfoContext.Provider value={[state, dispatch]}>
            {props.children}
        </UserInfoContext.Provider>
    );
};
export default UserInfoContextProvider;
