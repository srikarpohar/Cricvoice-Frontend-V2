const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');


function createConfig(env) {
  const isProd = env.mode === 'production';

  const config = {
    mode : isProd ? 'production' : 'development',
    entry: {
      shared: {
        import: "./src/shared/index.tsx"
      },
      index: { 
        import: "./src/index.tsx",
        dependOn: "shared"
      },
      admin: { 
        import: "./src/admin/index.tsx",
        dependOn: "shared"
      },
      users: { 
        import: "./src/users/index.tsx",
        dependOn: "shared"
      }
    },
    output: {
      path: resolve(__dirname, "dist"),
      filename: "cricvoice.[name].bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        }, 
        {
            test: /\.css?$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
      ],
    },
    optimization: {
      runtimeChunk: 'single',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
        favicon: "./public/cricvoice-logo.ico",
        manifest: "./public/manifest.json"
      }),
      new Dotenv({
          path: `./.env`
      }),
    ],
  };
  
  if (isProd) {
    config.optimization = {
      minimizer: [new TerserWebpackPlugin()],
    };
  } else {
    config.devServer = {
      port: 3000,
      historyApiFallback: true,
      open: true,
      compress: true,
      client: {
        logging: 'error'
      }
    };
  }
  return config;
}

module.exports = (env) => createConfig(env);