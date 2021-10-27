const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const sync = require("browser-sync").create();

function html() {
    return gulp.src('./src/pages/*.hbs')
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: ['./src/partials']
        }))
        .pipe(rename({
            basename: 'index',
            extname: '.html',
        }))
        .pipe(gulp.dest('../dist'));
};



function browserSync(cb) {
    sync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    watch('./src/partials/includes/*.hbs', html);
    watch('./src/partials/**/*', html);
}

exports.sync = browserSync;
exports.html = html;
exports.watch = browserSync;

