import { CurrentUserModelState } from './currentUser';
// import { StateType } from './login';

// export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  // global: GlobalModelState;
//   loading: Loading;
//   settings: ProSettings;
  currentUser: CurrentUserModelState;
//   login: StateType;
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }