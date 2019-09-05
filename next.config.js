const path = require('path');

// const exportPathMap = require('./dist/next/exportPathMap');

module.exports = {
  // exportPathMap,
  target: 'serverless',

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  experimental: { modern: true, documentMiddleware: true },

  // webpack: (config, options) => {
  webpack: (config, { isServer }) => {
    config.mode = 'production';

    // Fixes npm packages that depend on `fs` module
    // config.node = {
    //   fs: 'empty'
    // };

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }

    // The context is two levels out, because next does currently not support
    // configurations (next.config) in typescript
    // config.context = path.resolve(__dirname, '../../');
    // config.resolve = {
    //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    // };

    config.module.rules.push({ test: /\.tsx?$/, loader: 'ts-loader' });
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        'babel-loader',
        {
          loader: path.join(__dirname, './dist/webpack/loader/mdx-custom-loader')
        }
      ]
    });

    config.module.rules.push({
      test: /\.md$/,
      use: ['raw-loader']
    });

    return config;
  }
};
