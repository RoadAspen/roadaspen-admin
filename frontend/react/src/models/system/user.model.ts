import React, { useReducer } from 'react';

export interface UserState {
    id: number;
    creaded_at: string;
    updated_at: string;
    time_failure: string;
    username: string;
    pwd: string;
    secret: string;
    status: string;
    description: string;
}

export interface UserPageState {
    current: number;
    pageSize: number;
    total: number;
    username: string | undefined;
    user_list: UserState[];
    modal_visible: boolean;
    table_loading: boolean;
    handleType: 'add' | 'edit';
}

export type Payload = Partial<UserPageState>;

export type OnlyActionType =
    | 'modal_show'
    | 'modal_close'
    | 'get_table_list_data_start'
    | 'get_table_list_data_end';

type Action = { type: OnlyActionType } | { type: 'update'; payload: Payload };

const initicalState: UserPageState = {
    current: 1,
    pageSize: 10,
    total: 0,
    username: undefined,
    user_list: [],
    modal_visible: false,
    table_loading: false,
    handleType: 'add',
};

function userReducer(state: UserPageState, action: Action): UserPageState;
function userReducer(state: UserPageState, action: Action) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
        case 'modal_show':
            return { ...state, modal_visible: true };
        case 'modal_close':
            return { ...state, modal_visible: false };
        case 'get_table_list_data_start':
            return { ...state, table_loading: true };
        case 'get_table_list_data_end':
            return { ...state, table_loading: false };
        default:
            return { ...state };
    }
}

function useUser(): [UserPageState, React.Dispatch<Action>];

function useUser() {
    const [UserPageState, setUserPageState] = useReducer(userReducer, initicalState);
    return [UserPageState, setUserPageState];
}

export default useUser;
