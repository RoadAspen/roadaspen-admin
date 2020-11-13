/**
 * 全局状态
 */
import { Effect, Reducer } from 'umi';

// 当前全局状态
export interface GlobalModelState {
  token: string; // token
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
    token: localStorage.getItem('token') || '',
  },
  reducers: {
    changeToken(state, action) {
        // 如果
        if(action.payload.token){
            localStorage.removeItem('token');
        }else{
            localStorage.setItem('token', action.payload.token);
        }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CurrentUserModel;
