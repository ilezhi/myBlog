const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./_base');

var devConfig = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]--[local]--[hash:base64:8]'
                        }
                    }, 'postcss-loader'])
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: '8000',
        contentBase: './public',
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api/'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new ExtractTextPlugin('styles/site.css'),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
    ]
});

module.exports = devConfig;