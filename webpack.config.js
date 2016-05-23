var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var srcDir = path.resolve(process.cwd(), 'app');


//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    // console.log('dirs', dirs);
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        // console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    // console.log('jjjjjjj',JSON.stringify(files));
    return files;
}

module.exports = {
    devtool: "source-map",    //生成sourcemap,便于开发调试
    entry: getEntry(),         //获取项目入口js文件
    output: {
      path: path.join(__dirname, "app/dist/js/"), //文件输出目录
      publicPath: "app/dist/js/",        //用于配置文件发布路径，如CDN或本地服务器
      filename: "bundles.js",        //根据入口文件输出的对应多个文件名
    },
    module: {
      preLoaders: [
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'eslint-loader'}
      ],
      //各种加载器，即让各种文件格式可用require引用
      loaders: [
        { test: /\.js$/, loader: 'babel', query: {
            presets: ['react', 'es2015']
          } 
        },
        { test: /\.jsx$/, loaders: ['jsx?harmony'] },
        { test: /\.css$/, loader: "style-loader!css-loader"},
        { test: /\.less$/, loader: "style-loader!csss-loader!less-loader"}
      ]
    },
    resolve: {
      //配置别名，在项目中可缩减引用路径
      alias: {
        // jquery: srcDir + "/js/lib/jquery.min.js",
        // core: srcDir + "/js/core",
        // ui: srcDir + "/js/ui"
      }
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            // nie: "nie"
        }),
        //将公共代码抽离出来合并为一个文件
        new CommonsChunkPlugin('common.js'),
        //js文件的压缩
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};