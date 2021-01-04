
import { CurrentUserModelState } from './currentUser';
import { TagModelState } from './tag';
import {MenuModelState} from './system/menu'

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
  tag: TagModelState;
  menu:MenuModelState
//   login: StateType;
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }