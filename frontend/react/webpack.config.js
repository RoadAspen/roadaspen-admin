const common = require('./webpack.common');
const merge = require('webpack-merge');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');

// 根据 环境变量NODE_ENV的不同，输出不同的 webpack config
const config = merge.smart(common, process.env.NODE_ENV === 'development' ? dev : prod);

module.exports = config;
