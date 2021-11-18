const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {

    console.log(__dirname);
    console.log(path.join(__dirname, 'handlebars', 'src', 'partials', 'includes'));

    return {
        entry: "./handlebars/src/pages/index.hbs",
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
                        partialDirs: [
                            path.join(__dirname, 'handlebars', 'src', 'partials')
                        ]
                    }
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    handlebarsLoader: {}
                }
            }),
            new HtmlWebpackPlugin({
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
            }),
            new HtmlWebpackPlugin({
                title: 'My awesome service',
                template: './handlebars/src/pages/index.hbs',
                filename: path.join(__dirname, "dist", "index.html"),
            }),
        ]
    };
};