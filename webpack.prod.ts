import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

interface prodEnvVariables {
  analyzer: boolean;
}

export default (env: prodEnvVariables) => {
  const isAnalyzerEnabled = env.analyzer;

  const prodConfig = merge(common, {
    mode: 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          nodeModulesVendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'node_modules',
            chunks: 'all',
          },
          default: false,
        },
      },
      minimize: true,
      minimizer: [
        `...`,
        new HtmlMinimizerPlugin(),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: ['imagemin-optipng'],
            },
          },
        }),
      ],
    },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
      }),
    ],
  });
  if (isAnalyzerEnabled) {
    prodConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    );
  }

  return prodConfig;
};
