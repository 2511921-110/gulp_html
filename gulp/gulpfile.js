//プラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber  = require('gulp-plumber');
const changed  = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const imageminJpg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminGif = require('imagemin-gifsicle');
const mozjpeg  = require('imagemin-mozjpeg');
const browserSync = require('browser-sync');

const folderName = ".."

// 圧縮前と圧縮後のディレクトリを定義
const paths = {
  srcDir : 'src',// 圧縮前のディレクトリ
  dstDir : folderName+'/assets'// 圧縮後のディレクトリ
}

gulp.task('bs-reload', function () {
  browserSync.reload();
});

//タスクの定義
gulp.task("default", function() {
  // jpg,png,gif画像の圧縮タスク
    var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = paths.dstDir;
    gulp.watch( srcGlob , function(){
    gulp.src( srcGlob )
    .pipe(changed( dstGlob ))
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors:180
        })
    ]
    ))
    .pipe(gulp.dest( dstGlob ));
    });
    browserSync({
      // proxy: "http://hirose.ballet/",
      // files: [
      //   "../**/*.css",
      //   "../**/*.js",
      //   "../**/*.php",
      // ]
      server: {
         baseDir: folderName       //対象ディレクトリ
        ,index  : "index.html"      //インデックスファイル
      }
    });
  gulp.watch( folderName+"/*.html" ,['bs-reload']);
  gulp.watch( folderName+"/css/*.css" ,['bs-reload']);
  gulp.watch("./scss/*.scss", function(){
    gulp.src("./scss/*.scss") //ファイルの参照先を指定
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: require('node-reset-scss').includePath,
        outputStyle: 'expanded'
      }).on('error', sass.logError)) //プラグインの実行
      .pipe(sourcemaps.write({includeContent: false}))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("../css")); //処理を行ったファイルの保存先を指定
    });
});
