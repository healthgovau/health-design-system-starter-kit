const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = (env) => {

    console.log(__dirname);
    console.log(path.join(__dirname, 'handlebars', 'src', 'partials', 'includes'));

    return {
        entry: [
            "./handlebars/src/pages/index.hbs",
            './src/scss/main.scss',
            ],
        output: {
            path: path.resolve(__dirname, '../dist')
        },

        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            port: 5000,
            open: true,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true
            }
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                    options: {
                        precompileOptions : {
                            page: 'home',
                        },
                        partialDirs: [
                            path.join(__dirname, 'handlebars', 'src', 'partials')
                        ],
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { outputPath: './css', name: '[name].min.css'}
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
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
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({}),
            new HtmlWebpackPlugin({
                templateParameters:require('./handlebars/data.json'),
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
            }),
            new HtmlWebpackPlugin({
                templateParameters:require('./handlebars/data.json'),
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
                filename: path.join(__dirname, "dist", "index.html"),
            }),
        ]
    };
};