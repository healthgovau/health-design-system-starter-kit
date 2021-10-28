const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const gulp = require('gulp');
const {src, dest, watch, series, parallel} = require('gulp');
const sync = require("browser-sync").create();
const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let indata = JSON.parse(rawdata);

function html() {
    return gulp.src('./src/pages/*.hbs')
        .pipe(handlebars({
                data : indata
            },
            {
            ignorePartials: true,
            batch: ['./src/partials'],
            helpers: {
                array: [function(options) {
                    return options.fn(this);
                }],
                bold : [function(options) {
                    return new Handlebars.SafeString('<div class="mybold">' + options.fn(this) + "</div>");
                }]
            }
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

