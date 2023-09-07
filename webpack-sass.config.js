const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        './src/scss/main.scss',
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 'auto',
        open: true,
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        devMiddleware: {
            writeToDisk: true
        }
    },
    module: {
        rules: [
            {
                test: /.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'css')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
            chunkFilename: '[id].[chunkhash].js'
        })
    ]
};
