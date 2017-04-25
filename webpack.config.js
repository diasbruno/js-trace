var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "index.js",
    path: __dirname,
    publicPath: __dirname
  },
  module: {
    loaders: [{ test: /\.js$/, loader: "babel" }]
  }
};
