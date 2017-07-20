const path = require('path');

module.exports = {
    cache: true,

    devtool: 'cheap-eval-source-map',

    entry: './client/index.js',

    output: {
        path: path.resolve(__dirname),
        filename: 'renderer.js'
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};