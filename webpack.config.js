module.exports = {  
    entry: './src/codegen/index.js',
    output: {
        filename: 'lib.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};