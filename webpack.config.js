const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devMode = mode === 'development';

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name]_[hash][ext][query]',
    clean: true,
  },

  mode,
  devtool: 'eval-cheap-module-source-map', //eval-source-map
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 8081,
    open: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src/components'),
        exclude: '/node_modules/',
      },
      {
        test: /\.(png|jpg|ico|gif|)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]_[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name]_[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset',
        use: [
          {
            loader: 'svgo-loader',
            options: {
              configFile: false,
            },
          },
        ],
        include: path.resolve(__dirname, 'src/images'),
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
        generator: {
          filename: 'images/[name]_[hash][ext][query]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.svgoMinify,
          options: {
            encodeOptions: {
              multipass: true,
              plugins: [
                // see: https://github.com/svg/svgo#default-preset
                'preset-default',
              ],
            },
          },
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),
    new Dotenv(),
  ],
};
