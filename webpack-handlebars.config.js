const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
var glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const handbreakpages = './handlebars/src/pages/';


filenames = fs.readdirSync(handbreakpages);
var fns = [];

filenames.forEach(file => {
    fns.push(file);
});


module.exports = (env) => {

    return {
        entry: {
            // Added path to pull-in HDS JS 
            ...glob.sync("./src/js/*.js").reduce((acc, curr) => {
                return { ...acc, [path.basename(curr, ".js")]: curr }
            }, {}),
            ...glob.sync("./assets/hds/js/*/*.js").reduce((acc, curr) => {
                return { ...acc, [path.basename(curr, ".js")]: curr }
            }, {}),
            ...glob.sync("./src/scss/*.scss").reduce((acc, curr) => {
                return { ...acc, [path.basename(curr, ".scss")]: curr }
            }, {}),
            ...glob.sync("./handlebars/src/pages/*.hbs").reduce((acc, curr) => {
                return { ...acc, [path.basename(curr, ".hbs")]: curr }
            }, {}),
            ...glob.sync("./src/img/*.*").reduce((acc, curr) => {
                return { ...acc, [path.basename(curr, ".*")]: curr }
            }, {}),
        },
        output: {
            path: path.resolve(__dirname, './dist')
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
                watch: true,
            },
            watchFiles: ["./dist/*", "./dist/css/*", "./src/scss/*", "./src/scss/parts/*"],
            port: 'auto',
            open: true,
            hot: false,
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/dist/index.html' },
                    // { from: /^\/about/, to: '/dist/about.js' },
                    { from: /(.*)/, to: '/test.html' },
                ],
            },
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
                    test: /\.(png|jpg|gif)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: './img',
                                name: '[name].[ext]'
                            }
                        },
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                // {
                //     test: /\.(png|jpg|gif)$/i,
                //     type: 'asset/resource'
                //     // use: [
                //     //     {
                //     //         loader: 'url-loader',
                //     //         options: {
                //     //             limit: 8192,
                //     //         },
                //     //     },
                //     // ],
                // }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].[chunkhash].js'
            }),
            // new CopyPlugin({
            //     patterns: [
            //         {from: "./img", to: path.join(__dirname, "img")},
            //     ],
            // }),
            new webpack.LoaderOptionsPlugin({}),
            // new HtmlWebpackPlugin({
            //     templateParameters: require('./handlebars/data.json'),
            //     title: 'My awesome service',
            //     template: './handlebars/src/pages/index.hbs',
            // }),
            ...filenames.map((event) => {
                return new HtmlWebpackPlugin({
                    templateParameters: require('./handlebars/data.json'),
                    title: 'My awesome service',
                    template: './handlebars/src/pages/' + event,
                    // filename: path.join(__dirname, "dist", event.replace(/\.[^/.]+$/, "")+".html"),
                })
            }),
            ...filenames.map((event) => {
                return new HtmlWebpackPlugin({
                    templateParameters: require('./handlebars/data.json'),
                    title: 'My awesome service',
                    template: './handlebars/src/pages/' + event,
                    filename: path.join(__dirname, "dist", event.replace(/\.[^/.]+$/, "") + ".html"),
                })
            }),
        ],
    };
};
