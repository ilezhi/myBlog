import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import baseWebpackConfig from './_base';


var prodConfig = merge(baseWebpackConfig, {
    module: {
        rule: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
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


export default prodConfig;