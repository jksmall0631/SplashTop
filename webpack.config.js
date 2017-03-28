var webpack = require('webpack');
module.exports = {
  entry: {
  app: ['webpack/hot/dev-server', './app/index.js'],
},
output: {
  path: './app',
  filename: 'bundle.js',
  publicPath: '/'
},
module: {
 loaders: [
   { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
   { test: /\.css$/, loader: 'style-loader!css-loader' }
 ]
},
 plugins: [
   new webpack.HotModuleReplacementPlugin()
 ]
}
