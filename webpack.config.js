var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var DEV_PATH = path.resolve(ROOT_PATH, 'src');
var PUBLIC_PATH = path.resolve(ROOT_PATH, 'public');
var ENV = process.env.NODE_ENV.trim();

/*插件定义*/
var plugins = [
    new HtmlwebpackPlugin({
        chunks: ['index', 'vendor'],
        template: path.resolve(PUBLIC_PATH, 'index.html'),
        filename: path.resolve(BUILD_PATH, 'index.html'),
        hash: true
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),
    new webpack.HotModuleReplacementPlugin()
]


module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        index: ['babel-polyfill', 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', path.resolve(DEV_PATH, 'index.js')],
        vendor: ['react', 'react-dom']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: path.resolve(BUILD_PATH, 'js'),
        /*        publicPath: "/output/",*/
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.(png|jpg)$/,
                use: ['url-loader?limit=8192&name=./img/[hash].[ext]'],
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: BUILD_PATH,
        hot: true,
        compress: true,
        historyApiFallback: true,
        publicPath: '/',
        port: 3000
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: '/node_modules/'
    },
    plugins: plugins
};
