var gulp = require('gulp');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// Configure the clean task
gulp.task('clean', function () {
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

// Copy all static assets
gulp.task('copy', ['clean'], function() {

    gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Configure the browserSync task
gulp.task('browserSync', ['copy'], function() {
    var compiler = webpack( require('./webpack.config.js') );
    browserSync.init({
        server: {
            baseDir: 'dist',
            middleware: [
                webpackDevMiddleware(compiler, {
                    hot: true,
                    filename: 'bundle.js',
                    publicPath: '/js/',
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
    });
});

// Configure the build task
gulp.task('build', ['copy'], function() {
    return gulp.src('src/index.js')
        .pipe(webpackStream( require('./webpack.production.config.js') ))
        .pipe(gulp.dest('dist/js'));
});

// Dev Task
gulp.task('dev', ['browserSync'], function() {
});

// Prod Task
gulp.task('prod', ['build'], function() {
});
