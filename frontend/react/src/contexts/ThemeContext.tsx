/**
 * 全局色彩管理
 */
import React, { useReducer } from 'react';

interface ThemeType {
    btnColor: string;
    color: string;
}
type Action = { type: 'black' | 'red' };

const initialState: ThemeType = {
    btnColor: '#808080',
    color: 'green',
};

// 创建修改 theme 的reducer
function reducer(state: ThemeType = initialState, action: Action) {
    switch (action.type) {
        case 'black':
            return { ...state, color: 'black' };
        case 'red':
            return { ...state, color: 'red' };
        default:
            return { ...state };
    }
}

type ContextType = { state: ThemeType; dispatch: React.Dispatch<Action> };

export const ThemeContext = React.createContext<ContextType>({} as ContextType);

const StoreContextProvider = (props: { children: React.ReactNode }) => {
    // prettier-ignore
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>
    );
};
export default StoreContextProvider;
