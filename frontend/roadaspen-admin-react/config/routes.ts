import { Routes } from './type';
const routes: Routes = [
  {
    path: '/login', // 登录
    title: '登录',
    component: '@/pages/login'
  },
  {
    path: '/',
    component: '@/layouts/SecurityLayout', // 在这里判断是否登录
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
            icon:'',
            component: '@/pages/index',
            wrappers: ['@/components/RouteComponentAuth'], // 判断是否存在页面权限
          },
          {
            path: '/system', // 系统管理
            title:'系统管理',
            icon:'',
            routes: [
              {
                path: '/system',
                exact: true,
                title:'系统管理',
                redirect: '/system/user',
              },
              {
                path: '/system/user', // 用户管理
                exact: true,
                title:'用户管理',
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
