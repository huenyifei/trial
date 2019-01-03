var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: ['./src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
        publicPath: '/dist/', // 通过devServer访问路径
        filename: 'build.js' // 打包后的文件名
    },
    // devServer: {
    //     historyApiFallback: true,
    //     overlay: true
    // },
    resolve: {
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': [
                            'vue-style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    }
                }
            },
            {
                test: /\.(woff?|eot|ttf|otf|svg|woff2)(\?.*)?$/,
                loader: 'url-loader'
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
};
