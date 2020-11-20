/**
 * 全局状态
 */
import { removeToken, setToken } from '@/utils/auth';
import { Effect, Reducer } from 'umi';
// 当前全局状态
export interface GlobalModelState {
  token?: string | null; // token
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
    token: null,
  },
  reducers: {
    changeToken(state, action) {
        // 如果
        if(!action.payload.token){
            removeToken();
        }else{
            setToken( action.payload.token);
        }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default CurrentUserModel;
