/**
 * 当前用户的信息
 */
import { Effect, Reducer } from 'umi';

import { getCurrentUserInfo,getCurrentUserRoutes } from '@/services/currentUser';

// 当前用户信息
export interface CurrentUser {
  username?: string; // 用户账号
  nickname?: string; // 用户昵称
  group?: string;  // 组
  signature?: string; // 签名
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string; // 用户id
}

export interface CurrentUserModelState {
  currentUser?: CurrentUser;
  fetchUserInfo?:boolean; // 是否获取用户信息
}

export interface CurrentUserModelType {
  namespace: 'currentUser';
  state: CurrentUserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<CurrentUserModelState>;
    changeNotifyCount: Reducer<CurrentUserModelState>;
  };
}

const CurrentUserModel: CurrentUserModelType = {
  namespace: 'currentUser',

  state: {
    currentUser: {},
    fetchUserInfo:false
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrentUserInfo);
      // 请求用户信息成功，存储用户信息，并将fetchUserInfo标识为true
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
        fetchUserInfo:true
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default CurrentUserModel;