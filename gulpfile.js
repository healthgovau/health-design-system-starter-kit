const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
var sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const handlebars = require('gulp-compile-handlebars');
const sync = require("browser-sync").create();
const fs = require('fs');
let rawdata = fs.readFileSync('./handlebars/data.json');
let indata = JSON.parse(rawdata);


const paths = {
    html: {
        src: ['./assets/html/*.html'],
        dest: './dist/',
    },
    images: {
        src: ['./assets/content/images/**/*'],
        dest: './dist/content/images/',
    },
    styles: {
        src: ['./assets/scss/**/*.scss'],
        dest: './dist/css/',
    },
    scripts: {
        src: ['./assets/hds/js/src/*.js'],
        lib: ['./assets/hds/js/libraries/*'],
        dest: './dist/js/',
    },
    cachebust: {
        src: ['./dist/**/*.html'],
        dest: './dist/',
    },
};

function copyHtml() {
    return src(paths.html.src).pipe(dest(paths.html.dest));
}

function optimizeImages() {
    return src(paths.images.src)
        .pipe(imagemin().on('error', (error) => console.log(error)))
        .pipe(dest(paths.images.dest));
}

function compileStyles() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dest));
}

function minifyScripts() {

    console.log(paths.scripts.src)

    return src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(terser().on('error', (error) => console.log(error)))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.scripts.dest));
}

function copyLib() {

    return src(paths.scripts.lib).pipe(dest(paths.scripts.dest));
}


function cacheBust() {
    return src(paths.cachebust.src)
        .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
        .pipe(dest(paths.cachebust.dest));
}

function watcher() {
    watch(paths.html.src, series(copyHtml, cacheBust));
    watch(paths.images.src, optimizeImages);
    watch(paths.styles.src, parallel(compileStyles, cacheBust));
    watch(paths.scripts.src, parallel(minifyScripts, cacheBust));
}

function browserSync(cb) {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch(paths.html.src, copyHtml);
    watch(paths.styles.src, compileStyles);
    watch('./assets/scss/*', compileStyles);
    watch(["./dist/*.html","./dist/css/*"]).on('change', sync.reload);
}

function cssOnly(cb) {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch(paths.styles.src, compileStyles);
    watch('./assets/scss/*', compileStyles);
    watch(["./dist/*.html","./dist/css/*"]).on('change', sync.reload);
}

function handlebarsCompile() {
    return gulp.src('./handlebars/src/pages/*.hbs')
        .pipe(handlebars({
                data : indata
            },
            {
                ignorePartials: true,
                batch: ['./handlebars/src/partials'],
        }))
        .pipe(rename({
            basename: 'index',
            extname: '.html',
        }))
        .pipe(gulp.dest('./dist'));
};


exports.handlebarsCompile = handlebarsCompile;
exports.copyLib = copyLib;
exports.copyHtml = copyHtml;
exports.optimizeImages = optimizeImages;
exports.compileStyles = compileStyles;
exports.minifyScripts = minifyScripts;
exports.cacheBust = cacheBust;
exports.watcher = watcher;
exports.sync = browserSync;
exports.cssOnly = cssOnly;

exports.default = series(
    parallel(copyHtml, optimizeImages, compileStyles, minifyScripts),
    cacheBust,
    watcher
);