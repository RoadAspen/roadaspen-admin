const webpack = require('webpack');
const path = require('path');
// 当mode为development的时候为开发模式，此时一切以编译速度，快速debug为主，取消一切代码优化操作。
module.exports = {
    entry: ['react-hot-loader/patch'],
    mode: 'development', // 开发环境，wenpack会自动添加开发环境下的优化配置
    output: {
        filename: 'static/js/[name].[hash].js', // js文件输出到path中的js目录中,hash每次修改都是最新的
        chunkFilename: 'static/js/[name].[hash].js', // js文件分块，动态加载时名称,hash每次修改都是最新的
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'), // 对于自己写的 css
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', // 主要解析 @import 和 url()
                        options: {
                            // modules: true, // 支持 css modules,公共css 需要使用:global(class) 来写。
                            importLoaders: 1, // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader
                        },
                    },
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                include: path.resolve(__dirname, 'src'), // 对于自己写的less
                use: [
                    'style-loader',
                    // 此为将 scss 生成 xxxx.scss.d.ts 文件
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {
                            formatter: 'prettier',
                        },
                    },
                    {
                        loader: 'css-loader', // 主要解析 @import 和 url()
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]', // 生成类名规则
                            }, // 支持 css modules,公共css 需要使用:global(class) 来写。
                            importLoaders: 1, // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader
                            localsConvention: 'camelCase', // 支持导出驼峰命名, 也可以使用 原始命名
                        },
                    },
                    {
                        loader: 'sass-loader', // 先执行less，转换为css
                        options: {
                            implementation: require('sass'),
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(less|css)$/, // 对于自己编写的less，可以 开启 css modules
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        // 生成 less.d.ts
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {
                            formatter: 'prettier',
                        },
                    },
                    {
                        loader: 'css-loader', // 主要解析 @import 和 url()
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash:base64:5]', // 生成类名规则
                            }, // 支持 css modules,公共css 需要使用:global(class) 来写。
                            importLoaders: 1, // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader
                            localsConvention: 'camelCase', // 支持导出驼峰命名, 也可以使用 原始命名
                        },
                    },
                    {
                        loader: 'less-loader', // 先执行less => css
                    },
                ],
            },
            {
                test: /\.(less|css)$/, // 对于antd 中引入的css或者less，不能开启css modules。
                include: path.resolve(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    plugins: [
        // 开启 HMR 时，使用该插件用于显式模块的相对路径，用于开发环境
        new webpack.NamedModulesPlugin(),
        // 热模块替换
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        // 优化选项，根据 mode执行不同的优化,常用的有，压缩，代码分割，开发模式下追求速度
        minimize: false, // 是否开启压缩，production模式下是默认为true的,
        // minimizer:[],//自定义压缩工具
        splitChunks: {
            chunks: 'all',
        }, // 动态导入模块，代码分割，不会统一打包到同一个文件中
        noEmitOnErrors: true, // 编译出错时，会跳过生成阶段，确保没有生成出错误资源
        namedModules: true, // 生成更可读的模块名称，方便调试。 在 开发模式下启用，生产模式下禁用
    },
    devServer: {
        // 开发服务器,主要设置开发服务器。
        // 配置 devServer
        /**
         * output里面的path表示的是output目录对应的一个绝对路径。
         * output里面的publicPath表示的是打包生成的index.html文件里面引用资源的前缀，默认为 "/"。
         * devServer里面的publicPath表示的是index.html 中文件根路径所处位置（若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值）
         * devServer里面的contentBase表示的是告诉服务器从哪里提供内容。（只有想提供静态文件时才需要）。
         */
        contentBase: path.resolve(__dirname, './dist'), // 告诉dev-server 从哪个目录中提供内容，主要是提供静态文件目录，指的不是由webpack打包生成的静态文件,。
        publicPath: '/', // 默认为"/",即服务的project的根路径, publicPath是用来指定server提供服务的url路径；相对于server的路径,可以通过这个路径访问bundle文件，静态文件会加上这个前缀，这个只影响开发服务器。但是loader打包出来的路径还是基于output.public.
        compress: false, // 是否启用压缩，开发模式下不需要压缩
        host: '0.0.0.0',
        port: process.env.Mock ? 9050 : 9052, // 监听端口
        open: true, // 运行时打开浏览器页面
        hot: true, // 热模块替换，在某些模块不支持热更新的情况下，hot会刷新页面
        // hotOnly: true,// 在某些模块不支持热更新的情况下，hot会刷新页面，hot only不会刷新页面,会在控制台打印更新失败
        https: false, // 是否支持https
        historyApiFallback: true, // 如果使用的是 HTML5 history API,则将所有的url路径都返回index.html
        // inline:true,
        before: function(app) {
            // 在服务器的中间件使用之前执行,可以添加 mock js
            process.env.MOCK && useMock(app);
        },
        proxy: process.env.MOCK
            ? {}
            : {
                  // 所有的
                  '/api': {
                      // 代理，如果不模拟数据则代理
                      //context: ["/api", "/user_login"], // 代理多个端口到同一个地址
                      target: process.env.HOST || 'http://localhost:8081', // 后端运行端口
                      changeOrigin: true,
                      pathRewrite: { '/api': '' }, // 替换 url中一部分, 将 /dev-api/ 替换为空
                      bypass: function(req) {
                          // 如果是路径请求html，则绕过代理，直接返回html
                          //不是html，则是ajax请求或者是除html外的静态资源，走代理
                          if (req.headers.accept.indexOf('html') !== -1) {
                              console.log('Skipping proxy for browser request.');
                              return '/index.html';
                          }
                      },
                  },
              },
    },
    devtool: 'eval-source-map', // eval-source-map 是开发环境下最佳品质的source-map
    // devtool:"source-map", // source-map 是生产环境下最佳，但是普通用户可以访问到source-map,应该在服务器上禁止普通用户访问
    target: 'web', // 构建环境。默认为web,可选为 node环境，webworker环境，exectron-main主进程，async-node 类nodejs环境
    externals: '', // 外部扩展，如jquery，lodash
    performance: {
        // 性能提示
        hints: 'warning', // 一个文件超过250kb时会警告
        maxEntrypointSize: 400000000, // 入口资源体积
        maxAssetSize: 400000000, // 单个打包资源体积
        assetFilter: function() {
            // pass
        }, // 文件过滤，哪些文件不需要大小提示
    },
};
