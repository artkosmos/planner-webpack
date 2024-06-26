import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { type Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (() => {
  const config: Configuration & DevServerConfiguration = {
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[name].[contenthash].chunk.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/],
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todolist&Webpack',
        filename: path.resolve(__dirname, 'dist', 'index.html'),
        template: path.resolve(__dirname, 'public', 'template.html'),
      }),
      new MiniCssExtractPlugin(),
    ],
  };

  return config;
})();
