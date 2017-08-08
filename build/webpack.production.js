const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpckPlugin = require('clean-webpack-plugin');
const config = require('../config/webpack');

const baseWebpackConfig =  require('./_base');


var prodConfig = merge(baseWebpackConfig, {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]--[local]--[hash:base64:8]'
                        }
                    }, 'postcss-loader'])
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin('styles/[name].[contenthash:5].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new CleanWebpckPlugin([config.utils_paths.assets()], {
            root: config.path_project,
            verbose: true,
            dry: false
        })
    ]
});


module.exports = prodConfig;