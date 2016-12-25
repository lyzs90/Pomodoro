'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

//=============================================================================
// Development
//=============================================================================

// Configure gulp sass task
gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Copy all static assets
gulp.task('copy', function() {
    gulp.src('src/*.+(html|json)')
        .pipe(gulp.dest('dist'));
});

// Configure gulp watch task
gulp.task('watch', ['copy'], function() {
    gulp.watch('src/**/*.+(html|json)', ['copy']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

// Configure the browserSync task
gulp.task('browserSync', ['watch'], function() {
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
            'src/**/*.scss',
            'src/**/*.html'
        ]
    });
});

// Main Dev Task
gulp.task('dev', ['browserSync'], function() {
});

//=============================================================================
// Production
//=============================================================================

// Configure the clean task
gulp.task('clean', function () {
    return gulp.src('dist/**/*', {read: false})
        .pipe(clean());
});

// Copy all static assets
gulp.task('prod-copy', ['clean'], function() {
    gulp.src('src/*.+(html|json)')
        .pipe(gulp.dest('dist'));
});

// Configure gulp sass task
gulp.task('prod-sass', ['prod-copy'], function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Configure the build task
gulp.task('build', ['prod-sass'], function() {
    return gulp.src('src/index.js')
        .pipe(webpackStream( require('./webpack.production.config.js') ))
        .pipe(gulp.dest('dist/js'));
});

// Main Prod Task
gulp.task('prod', ['build'], function() {
});
