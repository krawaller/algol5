module.exports = {  
    entry: './dev/box/app.js',
    output: {
        filename: './dev/box/bundle.js'
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