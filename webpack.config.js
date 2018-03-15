const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('config');

const configWebpack = {
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3331,
        historyApiFallback: true
    },
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + '/public/',
        filename: "[name].js"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader'],
                exclude: ['node_modules']
            },
            {
                test: /\.(scss)/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/template/index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
};

module.exports = configWebpack;