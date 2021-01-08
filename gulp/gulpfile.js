//プラグインの読み込み
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const glob = require('gulp-sass-glob');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

const webpackStream = require('webpack-stream');
const webpack = require('webpack');

// webpackの設定ファイルの読み込み
const webpackConfig = require('./webpack.config');

// 全ファイルパス
const paths = {
  rootDir: '../',
  scssSrc: 'scss/**/*.scss',
  jsSrc: 'js/**/*.js',
  imgSrc: 'assets/**/*',
  outCss: '../css',
  outJs: '../js',
  outImg: '../assets/',
};

// browser sync
function browserSyncFunc(done) {
  browserSync.init({
    server: {
      // proxy: 'http://wpdev.wise/',
      // proxy: 'http://localhost/',
      baseDir: paths.rootDir,
      // index: 'index.html',
      // files: ['../**/*.css', '../**/*.js', '../**/*.html'],
      // port: 3000,
      // reloadOnRestart: true,
      // middleware: [
      //   ssi({
      //     baseDir: paths.rootDir,
      //     notify: false, //通知
      //     ext: ".php"
      //   })
      // ]
    },
    // port: 3000,
    // reloadOnRestart: true,
    // proxy: 'http://wpdev.wise/',
    // files: ['../**/*.css', '../**/*.js', '../**/*.php'],
    files: ['../**/*.css', '../**/*.js', '../**/*.html'],
    port: 4000,
    reloadOnRestart: true,
  });
  done();
}

// sass
function sassFunc() {
  return gulp
    .src(paths.scssSrc, {
      sourcemaps: true,
    })
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(glob())
    .pipe(
      sass({
        includePaths: require('node-reset-scss').includePath,
        // outputStyle: 'compressed',
        outputStyle: 'expanded'
      })
    )
    .pipe(gulp.dest(paths.outCss), {
      sourcemaps: './sourcemaps',
    })
    .pipe(gulp.dest(paths.outCss), {
      sourcemaps: './sourcemaps',
    })
    .pipe(browserSync.stream());
}

// js
function jsFunc() {
  return plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  })
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(babel())
    .pipe(uglify({}))
    .pipe(gulp.dest(paths.outJs));
}

// img
function imgFunc() {
  return gulp
    .src(paths.imgSrc)
    .pipe(
      imagemin([
        pngquant('65-80'),
        mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle(),
      ])
    )
    .pipe(changed(paths.outImg))
    .pipe(gulp.dest(paths.outImg));
}

// watch
function watchFunc(done) {
  gulp.watch(paths.scssSrc, gulp.parallel(sassFunc));
  gulp.watch(paths.jsSrc, gulp.parallel(jsFunc));
  gulp.watch(paths.imgSrc, gulp.parallel(imgFunc));
  done();
}

// scripts tasks
gulp.task(
  'default',
  gulp.parallel(
    browserSyncFunc,
    watchFunc
    // browserSyncFunc, watchFunc, sassFunc, jsFunc,imgFunc
  )
);
