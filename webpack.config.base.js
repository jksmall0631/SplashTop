import path from 'path'
import webpack from 'webpack'
import { dependencies as externals } from './app/package.json'

export default {
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, 'app'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  externals: Object.keys(externals || {}),
}
