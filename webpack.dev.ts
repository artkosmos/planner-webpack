import { merge } from 'webpack-merge';
import common from './webpack.common';

export default () => {
  return merge(common, {
    mode: 'development',
    devServer: {
      hot: true,
      compress: true,
      port: 7000,
      historyApiFallback: true,
    },
  });
};
