const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        background: './src/background/background.js',
        content: './src/content/youtube-controller.js',
        popup: './src/popup/popup.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource',
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.json'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};