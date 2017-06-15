module.exports = {  
    entry: './src/index.js',
    output: {
        filename: './bundle.js'
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