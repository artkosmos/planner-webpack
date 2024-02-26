import path from 'path';
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import type {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import type {Mode} from "./types";

require('dotenv').config()


export default () => {
  const config: Configuration & DevServerConfiguration = {
    mode: process.env.MODE as Mode,
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    devServer: {
      hot: true,
      compress: true,
      port: 7000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Todolist&Webpack',
        filename: path.resolve(__dirname, 'dist', 'index.html'),
        template: path.resolve(__dirname, 'public', 'template.html')
      }),
      new ESLintPlugin()
    ]
  };

  return config
}
