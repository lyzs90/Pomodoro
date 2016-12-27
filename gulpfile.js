'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var preprocess = require('gulp-preprocess');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

//=============================================================================
// Development
//=============================================================================

// Compile sass + auto-inject into browser
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Preprocess html for development
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(preprocess({context: { NODE_ENV: 'development', DEBUG: true}}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Copy static assets to dist folder + auto-inject into browser
gulp.task('copy', function() {
    gulp.src('src/*.json')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Static server + watch scss/html files
gulp.task('browserSync', ['sass', 'copy', 'html'], function() {
    var compiler = webpack( require('./webpack.config.js') );
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
        }
    });
    // Use gulp to watch for changes
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*.json', ['copy']);
    gulp.watch('src/**/*.html', ['html']);
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

// Copy static assets
gulp.task('prod-copy', ['clean'], function() {
    gulp.src('src/*.json')
        .pipe(gulp.dest('dist'));
});

// Compile sass
gulp.task('prod-sass', ['clean'], function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Preprocess html for production
gulp.task('prod-html', ['clean'], function() {
  gulp.src('src/*.html')
    .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
    .pipe(gulp.dest('dist'));
});

// Configure the build task
gulp.task('build', ['prod-sass', 'prod-html', 'prod-copy'], function() {
    return gulp.src('src/index.js')
        .pipe(webpackStream( require('./webpack.production.config.js') ))
        .pipe(gulp.dest('dist/js'));
});

// Main Prod Task
gulp.task('prod', ['build'], function() {
});
