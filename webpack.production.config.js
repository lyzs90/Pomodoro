var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
    context: path.join(__dirname, 'src'),
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            root: process.cwd(),
            exclude: ['index.html', 'main.css']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
            },
        ],
    },
    resolveLoader: {
        root: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    resolve: {
        root: [
            path.join(__dirname, 'node_modules'),
        ],
    },
};

module.exports = config;
