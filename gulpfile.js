var gulp = require('gulp');
var exec = require('child_process').exec;
var Q = require('q');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var webpackConfig = require('./webpack.config.js');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'app');

var myConfig, devCompiler;
var reloadScripts = [
  'asset/**/*.js',
  'asset/*.js',
  'component/**/*.js',
  'component/*.js',
  'css/**/*.css',
  'css/*.css',
  '*.html',
  '**/**/*.html',
  'dist/**/*.js'
];

var webpackScripts = [
  'component/**/*.js',
  'js/**/*.js'
]; 

function webpacking() {
  myConfig = Object.create(webpackConfig);
  devCompiler = webpack(myConfig);
  devCompiler.run(function(err, stats) {
      if(err) throw new gutil.PluginError("webpack:build-js", err);
      gutil.log("[webpack:build-js]", stats.toString({
          colors: true
      }));
  });
}
// 监视文件改动并重新载入
gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: 'app',
    }
  });
});

gulp.task( 'webpack', webpacking )


gulp.task('md5:js', function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
}); 

gulp.task( 'watcher', function(){
  gulp.watch(reloadScripts, {cwd: 'app'}, reload);
  gulp.watch(webpackScripts, {cwd: 'app'}, webpacking);
})

gulp.task('default', ['webpack','watcher', 'serve'], function() {
  // 将你的默认的任务代码放在这
  console.log('Gulp starting ……^^………………^^……………………');
});