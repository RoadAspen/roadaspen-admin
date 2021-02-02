/**
 * 当前用户的信息
 */
import { Effect, Reducer } from 'umi';

import { getCurrentUserInfo } from '@/services/currentUser';
import { getToken, removeToken, setToken } from '@/utils/auth';

// 菜单
export type Menu = {
  // 左侧菜单
  path?: string; // 路径
  title?: string; // 文本
  icon?: string; // 图标
  children?: Menu[]; // 子菜单
  target?: boolean; // 是否外链
  parent?: string; // 父路由
  order?: number; // 排序
  type: string; // 类型， 目录 / 菜单 / 按钮
};
// 当前用户信息
export interface CurrentUser {
  userName?: string; // 用户账号
  nickName?: string; // 用户昵称
  group?: string; // 组
  userid?: string; // 用户id
  roles?: string[]; // 用户角色
  permissions?: string[]; // 用户权限
  menu_list?: Menu[]; // 用户菜单
}

export interface CurrentUserModelState {
  currentUser?: CurrentUser;
  fetchUserInfo?: boolean; // 是否获取用户信息
  token?: string | null; // token
}

export interface CurrentUserModelType {
  namespace: 'currentUser';
  state: CurrentUserModelState;
  effects: {
    fetchCurrentUserInfo: Effect;
  };
  reducers: {
    changeToken: Reducer<CurrentUserModelState>;
    saveCurrentUser: Reducer<CurrentUserModelState>;
    delToken: Reducer<CurrentUserModelState>;
  };
}

const CurrentUserModel: CurrentUserModelType = {
  namespace: 'currentUser',

  state: {
    currentUser: {},
    fetchUserInfo: false,
    token: getToken(),
  },

  effects: {
    *fetchCurrentUserInfo(_, { call, put }) {
      const response = yield call(getCurrentUserInfo);
      // 请求用户信息成功，存储用户信息，并将fetchUserInfo标识为true
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload.currentUser || {},
        fetchUserInfo: true,
      };
    },
    changeToken(state, { payload }) {
      // 如果
      setToken(payload.token);
      return {
        ...state,
        ...payload,
      };
    },
    delToken(state) {
      removeToken();
      return {
        ...state,
        token: undefined,
      };
    },
  },
};

export default CurrentUserModel;
