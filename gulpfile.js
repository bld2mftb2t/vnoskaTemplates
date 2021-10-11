const { src, dest, series, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function htmlp() {
   return  src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
     .pipe(htmlmin({
       collapseWhitespace: true
     }))
    .pipe(dest('dist/prod'))
}

function htmld() {
   return  src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(dest('dist/dev'))
}

function scssp() {
  return src('src/scss/**.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({grid: 'autoplace', cascade: false}))
    .pipe(concat('mainmin.css'))
    .pipe(csso())
    .pipe(dest('dist/prod/css'))
};

function scssd() {
  return src('src/scss/**.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({grid: 'autoplace', cascade: false}))
    .pipe(concat('main.css'))
    .pipe(dest('dist/dev/css'))
};

function fontsd() {
  var fontSrc = 'src/fonts/**';
  var fontDest = 'dist/dev/fonts';
  return src(fontSrc)
  .pipe(dest(fontDest))
}

function jsd() {
  var jsSrc = 'src/js/**';
  var jsDest = 'dist/dev/js';
  return src(jsSrc)
  .pipe(dest(jsDest))
}

function clear() {
  return del('dist/dev')
}

function serve() {
  sync.init({
    server: './dist/dev',
    open: 'external',
    host: '192.168.1.70',
    watch: true
  })
 
  watch('src/**.html', series(htmld)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scssd)).on('change', sync.reload)
  watch('src/js/**.js', series(jsd)).on('change', sync.reload)
}

exports.serve = series(clear, scssd, htmld, fontsd, jsd, serve)
exports.prod = series(clear, scssp, htmlp)
