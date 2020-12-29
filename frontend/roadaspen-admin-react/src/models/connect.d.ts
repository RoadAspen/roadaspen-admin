import { CurrentUserModelState } from './currentUser';
import { TagModelState } from './tag';

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
//   login: StateType;
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }