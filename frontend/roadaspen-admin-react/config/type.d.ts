/**
 * 
 */
export type routes = {
  path?: string;
  component?: string | (() => any);
  wrappers?: string[];
  redirect?: string;
  exact?: boolean;
  routes?: any[];
  [k: string]: any;
}[];
