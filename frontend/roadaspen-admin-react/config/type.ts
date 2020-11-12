/**
 * 类型定义
 */
export type Routes = {
  path?: string;
  component?: string | (() => any);
  wrappers?: string[];
  redirect?: string;
  exact?: boolean;
  routes?: any[];
  [k: string]: any;
}[];
