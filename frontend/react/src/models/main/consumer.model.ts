import React, { useReducer } from 'react';

export interface ConsumerState {
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

export interface ConsumerPageState {
    current: number;
    pageSize: number;
    total: number;
    username: string | undefined;
    consumer_list: ConsumerState[];
    add_modal_visible: boolean;
    edit_modal_visible: boolean;
    table_loading: boolean;
}

export type Payload = Partial<ConsumerPageState>;

export type OnlyActionType =
    | 'add_modal_show'
    | 'add_modal_close'
    | 'edit_modal_show'
    | 'edit_modal_close'
    | 'get_table_list_data_start'
    | 'get_table_list_data_end';

type Action = { type: OnlyActionType } | { type: 'update'; payload: Payload };

const initicalState: ConsumerPageState = {
    current: 1,
    pageSize: 10,
    total: 0,
    username: undefined,
    consumer_list: [],
    add_modal_visible: false,
    edit_modal_visible: false,
    table_loading: false,
};

function consumerReducer(state: ConsumerPageState, action: Action): ConsumerPageState;
function consumerReducer(state: ConsumerPageState, action: Action) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
        case 'add_modal_show':
            return { ...state, add_modal_visible: true };
        case 'add_modal_close':
            return { ...state, add_modal_visible: false };
        case 'edit_modal_show':
            return { ...state, edit_modal_visible: true };
        case 'edit_modal_close':
            return { ...state, edit_modal_visible: false };
        case 'get_table_list_data_start':
            return { ...state, table_loading: true };
        case 'get_table_list_data_end':
            return { ...state, table_loading: false };
        default:
            return { ...state };
    }
}

function useConsumer(): [ConsumerPageState, React.Dispatch<Action>];

function useConsumer() {
    const [ConsumerPageState, setConsumerPageState] = useReducer(consumerReducer, initicalState);
    return [ConsumerPageState, setConsumerPageState];
}

export default useConsumer;
