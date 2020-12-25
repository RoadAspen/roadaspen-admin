/**
 * 菜单
 */
import { Effect, Reducer } from 'umi';

import {
    get_menu_list
} from '@/services/system/menu';

// 菜单
export type Menu = {
  // 左侧菜单
  path?: string; // 路径
  title?: string; // 文本
  icon?: string; // 图标
  routes?: Menu[]; // 子菜单
  target?: boolean; // 是否外链
  parentId?: string; // 父id
  order?: number; // 排序
  type: string; // 类型， 目录 / 菜单 / 按钮
  show:boolean; // 是否显示
};

export interface MenuModelState {
  menu_list?: Menu[];
}

export interface CurrentUserModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuList: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<MenuModelState>;
  };
}

const CurrentUserModel: CurrentUserModelType = {
  namespace: 'menu',
  state: {
    menu_list:[]
  },
  effects: {
    *getMenuList(_, { call, put }) {
      const response = yield call(get_menu_list);
      // 请求用户信息成功，存储用户信息，并将fetchUserInfo标识为true
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        menu_list: payload.data || [],
      };
    },
  },
};

export default CurrentUserModel;
