// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: { main: './src/index.jsx' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      exclude: ['static']
    }),
    new CopyWebpackPlugin([
      {
        from: './src/media',
        to: './media'
      },
      {
        from: './src/data',
        to: './data'
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      files: './src/**/*.scss',
      syntax: 'scss'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
};
