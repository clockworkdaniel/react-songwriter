const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/client/index.tsx",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        }
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      // filename: 'style.[contenthash].css',
      filename: "[name].css"
    })
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  }
};
