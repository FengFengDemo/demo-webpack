//webpack ./main.js  ./build.js
const path = require('path');   //处理路径
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');   //生成html文件
module.exports = {
    // entry: './main.js',
    entry: {
        main: './src/main.js'
    },
    output: {
        path:path.resolve(__dirname,'./dist'),  //打包文件输出目录
        //publicPath:'./dist/',   //打包之后的文件需要配置访问路径
        filename: 'build.js'    //打包完成输出文件名称
    },
    // watch:true,     //监听代码改动，不需要刷新页面
    devServer: {       //在本地建立一个服务器，实时更新代码
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|png|sug)/,
                loader: 'url-loader?limit=10000'
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({  //区分环境
            'process.env.NODE_ENV' : {
                NODE_ENV: '"development"'
            }
        }),
        new htmlWebpackPlugin({ //生成html文件
            template: './index.html'
        }),
    ],
    /**
     * vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。
     * alias 重定向vue引入文件目录
     * */
    resolve: {  //解决
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
        }
    },

};