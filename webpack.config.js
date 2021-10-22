const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = (env) => {

    return {
        entry: './react/src/index.jsx',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'react/src/index.html'),
            }),
            // new Dotenv(),
            // new webpack.DefinePlugin({
            //     'process.env': {
            //         'REACT_APP_ENDPOINT': JSON.stringify(env.REACT_APP_ENDPOINT)
            //     }
            // }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },

            compress: true,
            port: 3000,
            historyApiFallback: true,
        },
        module: {
            rules: [
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
                },
            ],
        },
    };
};
