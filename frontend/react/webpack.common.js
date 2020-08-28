const HtmlWebpackPlugin = require("html-webpack-plugin"); // 解析html
const webpack = require("webpack");

const path = require("path");
const common = {
    entry: [
        // 入口文件，相对于webpack.config.js路径
        path.resolve("./src/index.tsx")
    ],
    output:{
        path: path.resolve(__dirname, "./dist"), // 生产模式下必须，build时所有文件的输出目录，包含css，html和image，icon等,开发环境是在内存中，所以这个路径无关紧要
        publicPath: "/" // 开发或者生产时，这个publicPath 为所有的资源连接指定一个前缀。可以使绝对路径，也可以是相对路径，相对路径是相对于html。会加到所有产生的url中
    },
    module: {
        rules: [ {
            test: /\.(ts|tsx)$/, // loader执行顺序，先进后出
            include: path.resolve(__dirname, "./src"),
            use: [ {
                loader: "babel-loader",
                options: {
                    presets: [
                        // presets执行顺序，先进后出
                        [
                            "@babel/preset-env", // 兼容
                            {
                                targets: {
                                    // 设置目标浏览器 如 targets :"> 0.25%,not dead"
                                    chrome: "58",
                                    ie: "9"
                                }
                            }
                        ],
                        "@babel/preset-react", // react语法预处理
                        "@babel/preset-typescript" // typescript 语法预处理
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-object-rest-spread",
                        [ "import", { // antd 按需加载
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css" // style 为true 会加载 less文件
                        } ]
                    ]
                }
            } ]
        },
        {
            test: /\.js$/, // loader执行顺序，先进后出
            include: path.resolve(__dirname, "./src"),
            use: [ {
                loader: "babel-loader",
                options: {
                    presets: [
                        // presets执行顺序，先进后出
                        [
                            "@babel/preset-env", // 兼容
                            {
                                targets: {
                                    // 设置目标浏览器 如 targets :"> 0.25%,not dead"
                                    chrome: "58",
                                    ie: "9"
                                }
                            }
                        ],
                        "@babel/preset-react", // react语法预处理
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-object-rest-spread",
                        [ "import", {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": "css" // style 为true 会加载 less文件
                        } ]
                    ]
                }
            } ]
        },
        {
            test: /\.(jpg|png|gif|bmp|jpeg|svg)$/, // 正则表达式匹配图片规则
            use: [ {
                loader: "url-loader",
                options: {
                    limit: 1, // 限制打包图片的大小：
                    // 如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                    name: "static/images/[name]-[hash].[ext]" // images:图片打包的文件夹；
                    // [name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                    // [hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                }
            } ]
        }
        ]
    },
    plugins: [
        // 开发或者打包时的功能插件，如html注入js，打包时清空上次打包记录
        new HtmlWebpackPlugin({
            inject: true, // 是否将js和css注入到index.html 中
            template: path.resolve(__dirname, './public/index.html'),
            minify: {
                collapseWhitespace: true, //删除空格、换行
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(), // 如果编译时报错则不继续输出文件

    ],
    resolve: {
        modules: [ path.resolve(__dirname, "src"), "node_modules" ], // 设置路径查找顺序,先查找 modules，在查找 node-modules
        // 解析，主要用于 import导入路径
        extensions: [ ".js", ".ts", ".tsx" ], // 自动解析扩展名
        alias: {
            // 别名
            "@": path.resolve(__dirname, "src/"), // 以 @ 表示src目录
        },
    }
};

module.exports = common;