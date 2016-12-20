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
            baseDir: 'www',
            middleware: [
                webpackDevMiddleware(compiler, {
                    publicPath: '/',
                    stats: {
                        colors: true,
                    },
                }),
                webpackHotMiddleware(compiler)
            ]
        },
    })
})

// Default task with browserSync
gulp.task('default', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('www/**/*.html', browserSync.reload);
    gulp.watch('src/**/*.js', browserSync.reload);
});
