import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login', // 登录
      exact:true,
      component: '@/pages/index',
      wrappers: ['@/config/auth'],
    },
    {
      path: '/', // 首页
      component: '@/layouts/index',
      wrappers: ['@/config/auth'],
    },
    {
      path: '/index', // 首页
      component: '@/pages/index',
      wrappers: ['@/config/auth'],
    },
    {
      path: '/users', // 首页
      component: '@/pages/user',
      wrappers: ['@/config/auth'],
    },
  ],
});
