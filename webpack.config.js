const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process'); // 터미널 명령어 실핼할 수 있음
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader', 
                    'css-loader'
                ] 
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        // 빌드된 파일 상단에 배너 넣기
        new webpack.BannerPlugin({
            banner: `
                이것은 배너입니다....  
                Build Date: ${new Date().toLocaleTimeString()}
                Commit Versions: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        // 환경 변수 활용
        new webpack.DefinePlugin({
            TWO: JSON.stringify('1+1'),
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        // html 파일도 빌드
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,
                removeComments: true,
            } : false
        }),
        // 빌드할때마다 빌드 폴더를 삭제하고 새로 만들어줌
        new CleanWebpackPlugin({}),
        // 빌드할 때, css 번들을 js 번들로부터 분리시켜준다.
        // new MiniCssExtractPlugin({filename: '[name].css'}),
        ...(
            process.env.NODE_ENV === 'production' 
            ? [new MiniCssExtractPlugin({filename: '[name].css'})]
            : []
        )
    ],
}