/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 *
 */
export default {
  dev: {
    '/api': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
