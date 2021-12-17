const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
var glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {

    console.log(__dirname);
    console.log(path.join(__dirname, 'handlebars', 'src', 'partials', 'includes'));

    return {
        entry: {
            ...glob.sync("./src/js/*.js").reduce((acc, curr) => {
                return {...acc, [path.basename(curr, ".js")]: curr}
            }, {}),
            ...glob.sync("./src/scss/*.scss").reduce((acc, curr) => {
                return {...acc, [path.basename(curr, ".scss")]: curr}
            }, {}),
            ...glob.sync("./handlebars/src/pages/*.hbs").reduce((acc, curr) => {
                return {...acc, [path.basename(curr, ".hbs")]: curr}
            }, {}),
            ...glob.sync("./img/*.*").reduce((acc, curr) => {
                return {...acc, [path.basename(curr, ".*")]: curr}
            }, {}),
        },
        output: {
            // clean: true,
            path: path.resolve(__dirname, '../dist'),
            // hotUpdateChunkFilename: 'hot/hot-update.[hash].js',
            // hotUpdateMainFilename: 'hot/hot-update.[hash].json'
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
                watch: true,
            },
            watchFiles: ["./dist/*","./dist/css/*","./src/scss/*","./src/scss/parts/*"],
            port: 'auto',
            open: true,
            historyApiFallback: true,
            liveReload: true,
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
                        precompileOptions: {
                            page: 'home',
                        },
                        partialDirs: [
                            path.join(__dirname, 'handlebars', 'src', 'partials')
                        ],
                    }
                },
                {
                    test: /.(scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
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
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/main.min.css',
                chunkFilename: "[id].css",
            }),
            new CopyPlugin({
                patterns: [
                    {from: "./img", to: path.join(__dirname, "dist", "img")},
                ],
            }),
            new webpack.LoaderOptionsPlugin({}),
            new HtmlWebpackPlugin({
                templateParameters: require('./handlebars/data.json'),
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
            }),
            new HtmlWebpackPlugin({
                templateParameters: require('./handlebars/data.json'),
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
                filename: path.join(__dirname, "dist", "index.html"),
            }),
        ],
    };
};