var path = require('path');
var webpack = require('webpack');

var config = {
    context: path.join(__dirname, 'src'),
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
