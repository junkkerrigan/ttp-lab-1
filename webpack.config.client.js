const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: {
        client: './src/client/index.tsx'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/public/index.html'),
        }),
        new LiveReloadPlugin(),
    ]
};