import { routes } from './type';
const routes: routes = [
  {
    path: '/login', // 登录
    exact: true,
    title: '登录',
    component: '@/pages/login',
    wrappers: ['@/components/RouteComponentAuth'],
  },
  {
    path: '/',
    component: '@/layouts/SecurityLayout',
    wrappers: ['@/components/RouteComponentAuth'],
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
            wrappers: ['@/components/RouteComponentAuth'],
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
                path: '/system/user', // 首页
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
