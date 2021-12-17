// Configuration
var filePermissions = 444; // 6=RW 4=R

// Load plugins
var gulp = require('gulp'),
    argv = require('yargs').argv,
    autoprefixer = require('gulp-autoprefixer'),
    chmod = require('gulp-chmod'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps');

// CSS
gulp.task('default', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(gulpif(argv.debug, sourcemaps.init()))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulpif(argv.debug, sourcemaps.write()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(chmod(filePermissions))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({ message: 'Styles task complete' }));
});
