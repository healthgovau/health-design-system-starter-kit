const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = (env) => {

    console.log(path.resolve(__dirname, 'html/index.html'));

    return {

        entry: [
            './html/index.html',
            './src/scss/main.scss',
            './src/js/scripts.js',
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: false,
            port: 4000,
            open: true,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true
            }
        },
        module: {
            rules: [
                {
                    test: /\.(html)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: './css',
                                name: '[name].min.css',
                                sourceMap: true}
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: './js',
                                name: '[name].js'
                            }
                        },
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },

    };
};
