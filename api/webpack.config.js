const path = require("path");

const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new webpack.ProvidePlugin({ "window.decomp": "poly-decomp" })],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
