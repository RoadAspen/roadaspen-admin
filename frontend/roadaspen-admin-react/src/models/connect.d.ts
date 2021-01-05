
import { CurrentUserModelState } from './currentUser';
import { TagModelState } from './tag';
import { MenuModelState} from './system/menu'

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean };
  models: {
    [key:string]: boolean;
  };
}

export interface ConnectStateType {
  // global: GlobalModelState;
  //   settings: ProSettings;
  //   login: StateType;
  loading: Loading;
  currentUser: CurrentUserModelState;
  tag: TagModelState;
  menu:MenuModelState
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }