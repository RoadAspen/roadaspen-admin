import { Routes } from './type';
// 该处路由用于 webpack 编译
const routes: Routes = [
  {
    path: '/login', // 登录
    exact: true,
    title: '登录',
    component: '@/pages/login',
  },
  {
    path: '/',
    component: '@/layouts/SecurityLayout', // 在这里判断是否登录，先判断token存在，再请求路由，双重判断
    routes: [
      {
        path: '/',
        component: '@/layouts/BasicLayout',
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
            // wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
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
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
