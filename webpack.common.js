const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ["source-map-loader"]
            },
            {
                test: /\.html$/,   
                use: ["html-loader"] // Let require images in files
            },
            {
                test: /\.(svg|png|jpg|gif)$/, //handles sepcified file types
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            }
        ]
    }
};