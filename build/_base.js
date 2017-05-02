const webpack = require('webpack');
const config = require('../config/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cache = config.cache;
const paths = config.utils_paths;


const filename = cache ? 'js/[name].[chunkhash].js' : 'js/[name].js';
const chunkFilename = cache ? 'js/[name].[chunkhash:5].js' : 'js/[name].js';

// console.log('paths', paths.project(config.dir_assets));

var baseConfig = {
    target: 'web',
    entry: {
        app: [paths.project(config.dir_src + '/main.js')],
        vendor: config.vendor_dependencies
    },
    output: {
        filename: filename,
        path: paths.project(config.dir_assets),
        chunkFilename: chunkFilename,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: config.utils_aliases
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.project(config.dir_assets + '/img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.project(config.dir_assets + '/fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};

module.exports = baseConfig;