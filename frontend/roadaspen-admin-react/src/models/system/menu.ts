/**
 * 菜单
 */
import { Effect, Reducer } from 'umi';

import { get_menu_list } from '@/services/system/menu';

// 菜单
export type Menu = {
  // 左侧菜单
  id?:string; // id
  key?: string; // 每个菜单key
  menuType?:string; // 菜单类型
  menuName?: string; // 菜单名称
  menuOrder?: number; // 排序
  icon?: string; // 图标
  path?: string; // 路由地址
  component?:string;// 组件路径
  permissionCode?:string; // 权限编码
  children?: Menu[]; // 子菜单
  isFrame?: boolean; // 是否外链
  parent?: string; // 父id
  show?: boolean; // 是否显示 true 显示  false 隐藏
  status?: 1 | 0; // 菜单状态 1正常 0 停用
  create_time?:string; // 创建时间
};

export interface MenuModelState {
  menu_list: Menu[];
  search_list: {
    title?: string;
    status?: number;
  };
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuList: Effect;
    addMenu: Effect;
  };
  reducers: {
    update: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menu_list: [],
    search_list: {
      title: undefined,
      status: undefined,
    },
  },
  effects: {
    *getMenuList(_, { call, put }) {
      const response = yield call(get_menu_list);
      // 请求用户信息成功，存储用户信息，并将fetchUserInfo标识为true
      yield put({
        type: 'update',
        payload: {
          menu_list: response.data,
        },
      });
    },
    addMenu(state, { payload }) {
      return {
        ...state,
        menu_list: payload.data || [],
      };
    },
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default MenuModel;
