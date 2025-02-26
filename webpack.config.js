import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mode = process.env.NODE_ENV || 'production';
const isDevMode = mode === 'development';

const config = {
  mode,
  entry: {
    index: './src/index.pug',
  },
  output: {
    path: getFullPath('public'),
    clean: true,
  },
  devtool: isDevMode ? 'eval-source-map' : 'source-map',
  devServer: {
    open: true,
    port: 5055
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1500
  },
  performance: {
    assetFilter
  },
  optimization: {
    minimize: !isDevMode,
    minimizer: isDevMode
      ? []
      : [
          new TerserPlugin(),
          new CssMinimizerPlugin()
        ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors'
        }
      }
    },
    runtimeChunk: 'single'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: HtmlBundlerPlugin.loader,
        options: {
          preprocessor: 'pug',
          preprocessorOptions: {
            pretty: isDevMode,
            basedir: getFullPath('src')
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'  // Specify target environment
          }
        }
      },
      {
        test: /\.(s[ac]?|c)ss$/,
        use: [
          HtmlBundlerPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        exclude: [getFullPath('src/assets/ico')]
      },
      {
        test: /\.(woff(2)|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        include: [getFullPath('src/assets/fonts')]
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/i,
        type: 'asset/source'
      }
      // Remove pug loader as it's handled by HtmlBundlerPlugin
    ]
  },
  plugins: [
    new HtmlBundlerPlugin({
      verbose: true, // Add verbose option for debugging
      pretty: isDevMode,
      entry: {
        index: {
          import: './src/index.js', // Change to JS entry
          template: './src/index.pug', // Add template option
          data: {
            title: 'My App',
            isDevMode
          }
        }
      },
      js: {
        filename: isDevMode ? '[name].bundle.js' : './assets/[name].[contenthash].js'
      },
      css: {
        filename: isDevMode ? '[name].css' : './assets/[name].[contenthash].css'
      }
    }),
    ...addProdPlugins([
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/assets/favico/**/*',
            to: getFullPath('public/[name][ext]')
          }
        ]
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static'
      }),
      new CompressionPlugin()
    ])
  ]
};

function getFullPath(path) {
  return path ? resolve(__dirname, path) : resolve(__dirname);
}

function addProdPlugins(plugins) {
  return !isDevMode && plugins ? plugins : [];
}

function assetFilter(assetFileName) {
  const extensionPattern = /\.(png|jpe?g|gif|webp|map)$/i;
  return !extensionPattern.test(assetFileName);
}

function getConfig() {
  if (!isDevMode) {
    const smp = new SpeedMeasurePlugin().wrap(config);
    return smp;
  }
  return config;
}

export default getConfig();