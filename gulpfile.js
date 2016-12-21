var gulp = require('gulp');
var browserSync = require('browser-sync')
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.js');

var compiler = webpack(webpackConfig);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            middleware: [
                webpackDevMiddleware(compiler, {
                    hot: true,
                    filename: 'bundle.js',
                    publicPath: '/',
                    stats: {
                        colors: true,
                    },
                    historyApiFallback: true,
                }),
                webpackHotMiddleware(compiler, {
                    log: console.log,
                    path: '/__webpack_hmr',
                    heartbeat: 10 * 1000,
                })
            ]
        },
        files: [
            'dist/**/*.css',
            'dist/**/*.html'
        ]
    })
})

// Default task with browserSync
gulp.task('default', ['browserSync'], function() {
});
