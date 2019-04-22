const webpack = require("webpack");
const path = require("path");

console.log("Generating full API bundle...");
webpack(
  {
    entry: path.resolve(__dirname, "../src/index.ts"),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: "api.js",
      path: path.resolve(__dirname, "../dist/bundles")
    }
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log("Something went wrong :(");
    } else {
      console.log("Compilation complete!");
    }
  }
);
