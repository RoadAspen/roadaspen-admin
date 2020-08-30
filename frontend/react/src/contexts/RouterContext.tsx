/**
 * 全局菜单管理,当登录成功，获取用户菜单，并渲染左侧导航和白名单导航合并
 */
import React, { useReducer } from 'react';

interface UserInfo {
    user: {
        admin: boolean; // 是否是 admin账号
        createBy: string; // 创建该账号的账号
        createTime: string;// 创建时间
        sex: string; // 性别
        status: boolean; //  该账号是否启用
        loginDate: string; // 登录日期

    };
    roles: string[];
    permissions: string[];
}

const initialState: UserInfo = {
    user: {

    },
    roles: [],
    permissions: []
};

// 创建修改 theme 的reducer
function reducer(state: UserInfo = initialState, action: '') {
    switch(action.type) {
        case 'update':
            return { ...state, color: 'black' };

    }
}

type ContextType = [UserInfo, React.Dispatch<Action>];

export const UserInfoContext = React.createContext<ContextType>({} as ContextType);

const StoreContextProvider = (props: { children: React.ReactNode }) => {
    // prettier-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ThemeContext.Provider value={[state, dispatch]}>{props.children}</ThemeContext.Provider>
    );
};
export default StoreContextProvider;
