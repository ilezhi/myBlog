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
        app: paths.src('main.js'),
        vendor: config.vendor_dependencies
    },
    output: {
        filename: filename,
        path: paths.assets(),
        chunkFilename: chunkFilename,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: config.utils_aliases
    },
    externals: {
        'editor': 'Editor',
        'marked': 'marked',
        'moment': 'moment',
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
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        })
    ]
};

module.exports = baseConfig;