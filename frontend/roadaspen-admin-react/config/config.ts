import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env as { REACT_APP_ENV: 'dev' | undefined };
export default defineConfig({
  // hash: true, // 打包文件 hash
  title: 'roadaspen-admin 管理系统',
  dva: {
    // 开启dva 的热加载
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  routes: routes,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  //   dynamicImport: {
  //     // 懒加载 loading
  //     loading: '@/components/PageLoading/index',
  //   },
});
