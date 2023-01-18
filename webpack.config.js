const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: { main: './src/components/index.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name]_[hash][ext][query]',
    clean: true,
  },

  mode: 'development',
  devtool: 'eval-cheap-module-source-map', //eval-source-map
  devServer: {
    static: path.resolve(__dirname, './build'),
    compress: true,
    port: 8080,
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
              configFile: './svgo.config.js',
            },
          },
        ],
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
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
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
};
