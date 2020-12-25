import { Routes } from './type';
// 该处路由用于 webpack 编译
const routes: Routes = [
  {
    path: '/login', // 登录
    exact: true,
    component: '@/pages/login',
  },
  {
    path: '/',
    component: '@/layouts/SecurityLayout', // 在这里判断是否登录，先判断token存在，再请求路由，双重判断
    routes: [
      {
        path: '/',
        component: '@/layouts/basicLayout',
        routes: [
          {
            path: '/', // 首页
            exact: true,
            redirect: '/index',
          },
          {
            path: '/index', // 首页
            exact: true,
            component: '@/pages/index',
            wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
          },
          {
            path: '/system', // 系统管理
            routes: [
              {
                path: '/system',
                exact: true,
                redirect: '/system/user',
              },
              {
                path: '/system/user', // 用户管理
                exact: true,
                component: '@/pages/system/user',
                wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
              },
              {
                path: '/system/role', // 角色管理
                exact: true,
                component: '@/pages/system/role',
                wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
              },
              {
                path: '/system/menu', // 菜单管理
                exact: true,
                component: '@/pages/system/menu',
                wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
              },
              {
                path: '/system/dict', // 字典管理
                exact: true,
                component: '@/pages/system/dict',
                wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
