const path = require('path');

module.exports = {
    cache: true,

    devtool: 'inline-source-map',

    entry: {
        store: './Store/Store.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    target: 'electron-renderer'
};
