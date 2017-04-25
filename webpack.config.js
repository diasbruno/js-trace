var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

var env = process.env.TARGET;
console.log(env);

var output = {
  filename: "index.js",
  path: __dirname,
  publicPath: __dirname,
  library: "umd"
};

if (env !== "build") {
  output.filename = "index.js";
  delete output.library;
  delete output.libraryTarget;
}

console.log(output);

module.exports = {
  entry: path.resolve(__dirname, env == "build" ? "src/jstrace.js" : "src/index.js"),
  output: output,
  module: {
    loaders: [{ test: /\.js$/, loader: "babel-loader" }]
  }
};
