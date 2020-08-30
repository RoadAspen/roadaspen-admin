import React, { useReducer } from 'react';
import { Map } from 'immutable';

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
    modal_visible: boolean;
    table_loading: boolean;
    handleType: 'add' | 'edit'
}

export type Payload = Partial<ConsumerPageState>;

export type OnlyActionType =
    | 'modal_show'
    | 'modal_close'
    | 'get_table_list_data_start'
    | 'get_table_list_data_end';

type Action = { type: OnlyActionType } | { type: 'update'; payload: Payload };

const initicalState: ConsumerPageState = {
    current: 1,
    pageSize: 10,
    total: 0,
    username: undefined,
    consumer_list: [],
    modal_visible: false,
    table_loading: false,
    handleType: 'add'
};

function consumerReducer(state: ConsumerPageState, action: Action): ConsumerPageState;
function consumerReducer(state: ConsumerPageState, action: Action) {
    switch(action.type) {
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

function useConsumer(): [ConsumerPageState, React.Dispatch<Action>];

function useConsumer() {
    const [ConsumerPageState, setConsumerPageState] = useReducer(consumerReducer, initicalState);
    return [ConsumerPageState, setConsumerPageState];
}

export default useConsumer;
