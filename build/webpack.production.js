console.log('进入production');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseWebpackConfig =  require('./_base');


var prodConfig = merge(baseWebpackConfig, {
    module: {
        rule: [
            {
                test: /\.(css|scss)$/,
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
    plugins: [
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
        new wepback.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
         new ExtractTextPlugin('styles/site.css'),
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
    ]
});


module.exports = prodConfig;