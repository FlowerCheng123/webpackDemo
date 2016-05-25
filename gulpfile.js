var gulp = require('gulp');
var exec = require('child_process').exec;
var Q = require('q');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'app');

var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var myConfig, devCompiler, devMode = true;
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

//打包webpack
function webpacking() {
  if( !devMode ){
    myConfig = Object.create(webpackConfig);
    devCompiler = webpack(myConfig);
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
    });    
  }else{
    var config = require("./webpack.config.js");
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", 'webpack/hot/dev-server' );//'webpack/hot/only-dev-server'
    config.output.publicPath = 'http://localhost:8080/app/dist/js/';
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        hot: true,
        stats: { colors: true },
        publicPath: "http://localhost:8080/app/dist/js/",
    });
    server.listen(8080);
  }
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
    gulp.src('app/dist/js/*.js')
        .pipe(md5(10, 'app/dist/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
}); 

gulp.task( 'watcher', function(){
  gulp.watch(reloadScripts, {cwd: 'app'}, reload);
})

gulp.task('default', ['webpack', 'watcher', 'serve'], function() {
  // 将你的默认的任务代码放在这
  console.log('Gulp starting ……^^………………^^……………………');
});