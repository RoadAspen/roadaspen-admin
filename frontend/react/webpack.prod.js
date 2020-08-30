const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css到单独文件
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin"); // build时清空目标文件夹
const path = require("path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css 代码压缩

// 当mode为production时为生产模式，此时需要打包编译，压缩，拆分，css提取等一系列优化操作。
module.exports = {
    mode: "production", // 生产环境，webpack会自动添加生产环境下的优化配置，如 压缩，分块等
    output: {
        filename: "static/js/[name].[chunkhash].js", // js文件输出到path中的js目录中，chunkhash 有修改是才会生成新的hash'
        chunkFilename: "static/js/[name].[chunkhash].js", // js文件分块，动态加载时名称，chunkhash 有修改是才会生成新的hash'
    },
    module: {
        rules: [ {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'), // 对于自己写的 css
            use: [
                MiniCssExtractPlugin.loader, // 提取css到单独文件
                {
                    loader: "css-loader", // 主要解析 @import 和 url()
                    options: {
                        // modules: true, // 支持 css modules,默认开启，公共css 需要使用:global(class) 来写。
                        importLoaders: 1 // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader 2 postcss-loader lessloader
                    }
                },
                {
                    loader: `postcss-loader`,
                    options: {
                        plugins: [
                            require('autoprefixer') // css 前缀
                        ]
                    }
                }
            ]

        },
        {
            test: /\.s(a|c)ss$/,
            include: path.resolve(__dirname, 'src'), // 对于自己写的less
            use: [
                MiniCssExtractPlugin.loader, // 提取css到单独文件
                {
                    loader: "css-loader", // 主要解析 @import 和 url()
                    options: {
                        modules: {
                            localIdentName: '[local]__[hash:base64:5]' // 类名规则
                        }, // 支持 css modules,公共css 需要使用:global(class) 来写。
                        importLoaders: 2, // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader 
                        localsConvention: 'camelCase', // 支持导出驼峰命名, 也可以使用 原始命名
                    }
                },
                {
                    loader: `postcss-loader`, // 添加 浏览器内核前缀
                    options: {
                        plugins: [
                            require('autoprefixer') // 浏览器内核兼容配置
                        ]
                    }
                },
                {
                    loader: "sass-loader", // 先执行sass，转换为css,默认使用node-sass 引擎
                    options: {
                        implementation: require('sass') //这里使用 dart-sass，解决 node-grey 安装失败问题
                    }
                }
            ]

        },
        {
            test: /\.(less|css)$/, // 提取css到单独文件
            include: path.resolve(__dirname, 'src'),
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader", // 主要解析 @import 和 url()
                    options: {
                        importLoaders: 1, // css-loader 解析 @import之前需要执行几个loader， 1 postcss-loader 
                        localsConvention: 'camelCase', // 支持导出驼峰命名, 也可以使用 原始命名
                        // modules: true, // 支持 css modules,公共css 需要使用:global(class) 来写。
                    }
                },
                {
                    loader: "less-loader" // 先执行less，转换为css
                }
            ]

        },
        {
            test: /\.(less|css)$/, // 提取css到单独文件
            include: path.resolve(__dirname, 'node_modules'),
            use: [
                MiniCssExtractPlugin.loader, "css-loader", 'less-loader'
            ]
        },
        ]
    },
    optimization: { // 优化选项，根据 mode执行不同的优化,常用的有，压缩，代码分割
        // minimize: true, // 是否开启压缩，production模式下是默认为true的,
        // namedChunks:false, // 读取chunk标识符， production 默认为false
        splitChunks: { // 动态导入模块，代码分割，不会统一打包到同一个文件中
            chunks: "async", //推荐为all。 async 是将按需加载的块分割出来。 initial 是 初始块，即在所有逻辑代码之前需要导入的依赖代码，又叫入口代码，如 react ，react-router。 
            // all 是所有，包括入口代码和按需加载代码都会分割出来，还可以在 入口代码和按需加载代码之间共享。您可以将此配置与HtmlWebpackPlugin结合使用，它将为您注入所有生成的供应商块。
            minSize: 30000, // 最小包的大小超过30k，就需要提取出来
            minChunks: 1, // 在拆分之前共享模块的最小块数,默认为1
            maxAsyncRequests: 5, // 同时异步请求的文件数为5 ， 按需加载时并行请求的最大数量
            maxInitialRequests: 3, // 初始请求的js块 最大为3 ，即优先同步加载js块。 入口点的最大并行请求数
            automaticNameDelimiter: "-", // 抽取出来的文件名字的分隔符， 
            name: true, // 抽取出来的名字，表示自动生成文件名，默认为true
            // cacheGroups: { // 缓存组，将公共模块缓存。 继承自 splitChunks 配置， test ， priority , reuseExistingChunk 只能在缓存组中配置
            //     libs: { // 这个缓存组是将所有 node_modules 中的模块打包
            //         name:'chunk-libs', // 代替自动生成的名字
            //         test: /[\\/]node_modules[\\/]/, // 表示要过滤的 modules，默认为所有的modules，可匹配模块路径或chunk名字，当匹配的是chunk名字时，里边的所有modules都会被选中
            //         priority:10, // 抽取权重，当一个module满足多个缓存组要求时，哪个权重大，就抽取到哪个组里。
            //         chunks:'initial',
            //         reuseExistingChunk:true, // 是否使用已有的chunk，如果当前的chunk包含的模块已经被抽取，则不会生成新的模块。
            //     },
            //     antd: { // 默认的chunk分块
            //         name: 'chunk-antd',
            //         // chunks: 'initial',
            //         test:/[\\/]node_modules[\\/]_?antd(.*)/,
            //         priority: 20,
            //         // reuseExistingChunk:true, // 是否使用已有的chunk，如果当前的chunk包含的模块已经被抽取，则不会生成新的模块。
            //     },
            //     common: { // 默认的chunk分块
            //         // name: 'chunk-antd',
            //         chunks: 'all',
            //         priority: 1,
            //         // reuseExistingChunk:true, // 是否使用已有的chunk，如果当前的chunk包含的模块已经被抽取，则不会生成新的模块。
            //     },
            // }
        },
        // nodeEnv:false, // 设置 webpack环境的NODE_ENV，默认读取 mode的值，否则使用DefinePlugin设置值。
        noEmitOnErrors: true, // 编译出错时，会跳过生成阶段，确保没有生成出错误资源
        // namedModules: false, // 生成更可读的模块名称，方便调试。 在 开发模式下 默认为true，生产模式 默认为false
        mangleWasmImports: true, // 将导入修改为更短的字符串，减少包的大小，会破坏模块的导出名称。
        // removeAvailableModules:true, // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块， 默认为true
        // removeEmptyChunks:true
    },
    plugins: [
        new CleanWebpackPlugin(), // 清空目标文件夹
        new MiniCssExtractPlugin({ // 将css提取到单独的css文件中
            filename: 'static/css/[name].[chunkhash].css', // chunkhash 有修改是才会生成新的hash'
            chunkFilename: "static/css/[id].[chunkhash].css" // chunkhash 有修改是才会生成新的hash'
        }),
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano') // 开启css压缩
        })
    ]
}