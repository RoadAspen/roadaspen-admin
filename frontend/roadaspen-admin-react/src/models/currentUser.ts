/**
 * 当前用户的信息
 */
import { Effect, Reducer } from 'umi';

import { getCurrentUserInfo,getCurrentUserRoutes } from '@/services/currentUser';

// 当前用户信息
export interface CurrentUser {
  avatar?: string;
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
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getCurrentUserInfo);
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