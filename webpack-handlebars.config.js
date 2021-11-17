const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const sourceDir = path.join(__dirname, 'handlebars/src');
const templateDir = path.join(__dirname, 'pages/generated');
const buildDir = path.join(__dirname, 'build');
const { makeDataReplacements, registerHandlersHelpers } = require('./webpack.helpers.js');

module.exports =  {

    // return {
        entry: "./handlebars/src/pages/page-one.hbs",
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'main.js',
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
                serveIndex: true,
            },
            port: 5000,
            open: true,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true,
                serverSideRender: true,
                // serveIndex: true,
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
            // new webpack.LoaderOptionsPlugin({
            //     options: {
            //         handlebarsLoader: {}
            //     }
            // }),
            new HtmlWebpackPlugin({
                template: path.join(sourceDir, 'partials', 'layouts', 'base.hbs'),
                filename: path.join(templateDir, 'page-one.hbs'),
                inject: false,
            }),
            new HandlebarsPlugin({
                htmlWebpackPlugin: {
                    enabled: true,
                    prefix: 'html',
                },
                entry: path.join(sourceDir, 'partials','includes', '*.hbs'),
                output: (name) => {
                    const page = name !== 'index' ? name : '';
                    return path.join(buildDir, page, 'index.html');
                },
                data: path.join(sourceDir, 'data', '*.json'),
                partials: [
                    path.join(templateDir, 'template.hbs'),
                    path.join(sourceDir, 'views', 'partials', '*.hbs'),
                ],
                onBeforeSetup: (Handlebars) => {
                    return registerHandlersHelpers(Handlebars);
                },
                onBeforeRender: (Handlebars, data) => {
                    return makeDataReplacements(data);
                },
            }),
            // new HtmlWebpackPlugin({
            //     // title: 'My awesome service',
            //     // // template: './dist/index.htm',
            //     // template: './dist/main.js',
            //     template: './handlebars/src/pages/page-one.hbs',
            //     // outputFile: path.join(__dirname, 'dist/index.htm'),
            //     // filename: 'index.html',
            // }),
            // new HtmlWebpackPlugin({  // Also generate a test.html
            //     filename: 'test.html',
            //     template: './handlebars/hb.html'
            //
            // }),
            // new HandlebarsWebpackPlugin({
            //
            //     htmlWebpackPlugin: {
            //         enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
            //         prefix: "html", // where to look for htmlWebpackPlugin output. default is "html"
            //         HtmlWebpackPlugin // optionally: pass in HtmlWebpackPlugin if it cannot be resolved
            //     },
            //
            //     entry: path.join(process.cwd(), "src", "hbs", "*.hbs"),
            //     output: path.join(process.cwd(), "dist", "[name].html"),
            //
            //     partials: [
            //         path.join(process.cwd(), "html",/* <-- this should match htmlWebpackPlugin.prefix */ "*", "*.hbs"),
            //         path.join(process.cwd(), "src", "hbs", "*", "*.hbs")
            //     ]
            // })
        ]
    // };
};