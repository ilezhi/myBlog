import webpack from 'webpack';
import config from '../config/webpackConfig';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const cache = config.cache;
const paths = config.utils_paths;

const filename = cache ? 'js/[name].[chunkhash].js' : 'js/[name].js';
const chunkFilename = cache ? 'js/[name].[chunkhash:5].js' : 'js/[name].js';

var config = {
    target: 'web',
    entry: {
        app: [paths.project(config.dir_scr) + 'main.js'],
        vendor: config.vendor_dependencies
    },
    output: {
        filename: filename,
        path: paths.project(config.dir_assets),
        chunkFilename: chunkFilename,
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: config.utils_aliases
    },
    module: {
        rule: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.project(config.dir_assets + '/img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
                use: 'url-loader',
                options: {
                    limit: 10000,
                    name: paths.project(config.dir_assets + '/fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};

export default config;