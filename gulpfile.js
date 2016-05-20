var gulp = require('gulp');
var exec = require('child_process').exec;
var Q = require('q');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var webpackConfig = require('./webpack.config.js');
var gutil = require('gulp-util');
var webpack = require('webpack');


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
// 监视文件改动并重新载入
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app',
    }
  });

  gulp.watch(reloadScripts, {cwd: 'app'}, reload);
});



gulp.task( 'Flower', function(){
	var deferred = Q.defer();
	exec('jekyll build', function(err) {
	    if (err) return ; // 返回 error
	    // cb(); // 完成 task
	    console.log('aaaaaaaaaaaaaaa');
    });
	    // 执行异步的操作
	setTimeout(function() {
	    deferred.resolve();
	}, 3000);
	return deferred.promise;
})

gulp.task('md5:js', function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
}); 

gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig);
    var devCompiler = webpack(myConfig);
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
    });
});

gulp.task('default', ['webpack','serve'], function() {
  // 将你的默认的任务代码放在这
  console.log('Gulp starting ……^^………………^^……………………');
});