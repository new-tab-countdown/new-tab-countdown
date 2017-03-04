var webpack = require('webpack'),
path = require('path'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
args = require('yargs').argv;

var path = require('path');

var IS_PROD = args.prod;

/* Transpile JSX files in this directory */
var JS_SOURCE_DIRS = [
  path.resolve(__dirname)
];

/* Don't transpile files in this folder */
var JS_EXCLUDE_TRANSPILE_MATCH = /(node_modules)/;
/* Whether to create sourcemaps or not */
var JS_SOURCE_MAP = IS_PROD ? 'source-map' : 'eval-source-map';

var CSS_SOURCE_DIRS = [
  path.join(__dirname, 'src', 'styles')
];
var CSS_SOURCE_MAP = IS_PROD ? '!css!sass' : '!css?sourceMap!sass?sourceMap';
var CSS_OUTPUT_PATH = path.join('..', 'styles', 'site.css');

/* The files webpack uses to begin compilation */
var ENTRY_FILES = ['babel-polyfill', path.join(__dirname, 'src', 'components', 'App.jsx')];

/* Describes the way Webpack should output files */
var OUTPUT_FILES = {
  path: path.join(__dirname, 'assets', 'js'),
  filename: 'bundle.js'
};

var DEV_PLUGINS = [
  new ExtractTextPlugin(CSS_OUTPUT_PATH),
  new webpack.OldWatchingPlugin()
];

var PROD_PLUGINS = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      sequences: false,
      dead_code: false,
      conditionals: false,
      booleans: false,
      unused: false,
      if_return: false,
      join_vars: false,
      drop_console: false,
      drop_debugger: false
    },
    mangle: false,
    output: {
      comments: false
    }
  }),
  new ExtractTextPlugin(CSS_OUTPUT_PATH),
  new webpack.OldWatchingPlugin()
];


module.exports = [{
  name: 'bundle',
  entry: ENTRY_FILES,
  output: OUTPUT_FILES,
  target: 'web',
  devtool: JS_SOURCE_MAP,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      /* Babel Loader: Transpiles ES6 -> ES5 */
      test: /\.jsx?$/,
      include: [JS_SOURCE_DIRS],
      exclude: JS_EXCLUDE_TRANSPILE_MATCH,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['babel-plugin-transform-decorators-legacy', 'transform-runtime'],
        cacheDirectory: true
      }
    }, {
      /* SCSS Loader: Transpiles .SCSS -> .CSS*/
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', CSS_SOURCE_MAP)
    }]
  },
  sassLoader: {
    includePaths: [CSS_SOURCE_DIRS]
  },
  debug: !IS_PROD,
  plugins: IS_PROD ? PROD_PLUGINS.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]) : DEV_PLUGINS
}];

Date.now = function() {
  var now = new Date();
  var hours = now.getHours();
  var indicator = (hours >= 12 ? 'PM' : 'AM');
  hours = hours % 12;
  hours = hours ? hours : 12;
  return ((hours < 10) ? "0" : "") + hours + ":" +
  ((now.getMinutes() < 10) ? "0" : "") + now.getMinutes() + ":" +
  ((now.getSeconds() < 10) ? "0" : "") + now.getSeconds() + " " + indicator;
};
