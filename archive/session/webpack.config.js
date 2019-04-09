module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'algol.js',
    library: 'algol',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".ts",".js"]
  },
  module: {
    rules: [{
      test: /\.[jt]s$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  }
};