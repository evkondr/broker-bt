const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main-[hash].js',
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx','ttf'],
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|ico)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader',{
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }}],
            },
        ],
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/policy.html'),
            filename: 'policy.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        hot: true,
        port: 9000,
    },
}