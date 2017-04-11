import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import baseWebpackConfig from './_base';


var devConfig = merge(baseWebpackConfig, {
    module: {
        rule: [
            {
                test: /\.(css|scss)$/,
                use: ['css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});

export default devConfig;