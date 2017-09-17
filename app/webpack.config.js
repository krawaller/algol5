module.exports = {  
    entry: __dirname + '/src/index.js',
    output: {
        filename: __dirname + '/dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: [__dirname+'/node_modules/babel-preset-es2015',__dirname+'/node_modules/babel-preset-react']
                }
            }
        ]
    }
};