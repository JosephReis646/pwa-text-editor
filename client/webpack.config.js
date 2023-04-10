const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate',
      }),

      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'JATE',
        description: 'A text editor web application that works offline and stores data in IndexedDB',
        background_color: '#ffffff',
        display: "standalone",
				orientation: "portrait",
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        publicPath: "/",
        start_url:'/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 120, 152, 167, 180, 1024],
					destination: path.join("assets", "icons"),
          },
        ],
      }),
      //   new GenerateSW({
      //     exclude: [/\.(?:png|jpg|jpeg|svg)$/],

  
      //       runtimeCaching: [
      //         {
      //             urlPattern: /.(?:png|jpg|jpeg|svg)$/,
      //             handler: "CacheFirst",

      //       options: {
      //         cacheName: "images",
      //         expiration: { maxEntries: 10 },
      //         },
      //         },
      //       ],
      // }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: "src-sw.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
