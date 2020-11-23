/**
 * 全局状态
 */
import { getToken, removeToken, setToken } from '@/utils/auth';
import { Effect, Reducer } from 'umi';
export type Menu = {
  // 左侧菜单
  path?: string; // 路径
  title?: string; // 文本
  icon?: string; // 图标
  routes?: Menu[]; // 子菜单
  target?:boolean; // 是否外链
  parent?:string;// 父路由
  order?:number; // 排序
  type:string; // 类型， 目录 / 菜单 / 按钮
};
// 当前全局状态
export interface GlobalModelState {
  token?: string | null; // token
  menus_list: Menu[]; // 菜单
}

// 当前全局状态
export interface GlobalModelAction {
  type: string;
  payload: GlobalModelState;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeToken: Reducer<GlobalModelState, GlobalModelAction>;
  };
}

const CurrentUserModel: GlobalModelType = {
  namespace: 'global',

  state: {
    token: getToken(),
    menus_list: [],
  },
  reducers: {
    changeToken(state, action) {
      // 如果
      if (!action.payload.token) {
        removeToken();
      } else {
        setToken(action.payload.token);
      }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CurrentUserModel;
