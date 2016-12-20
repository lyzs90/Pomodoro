var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'www'
        },
    })
})

// Default task with browserSync
gulp.task('default', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('www/**/*.html', browserSync.reload);
    gulp.watch('src/**/*.js', browserSync.reload);
});
