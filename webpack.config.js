// import system dependencies
const path = require('path');

////////////////////////////////////////////////////////////////////////////////

const configuration = {
    mode: 'development',
    entry: {
        main: './client/scripts/main.react.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build/js'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.react.js', '.json', '*'],
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
        ]
    },
};

////////////////////////////////////////////////////////////////////////////////

module.exports = configuration;
