module.exports = {  
    entry: './src/engines/api.js',
    output: {
        filename: './dist/algol_sync.js',
        library: 'algol',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /SKITIT/,
                exclude: /.spec.js/, // excluding .spec files
                loader: "uglify"
            }
        ]
    }
};