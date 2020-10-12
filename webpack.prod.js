const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",  //name is variable for main, vendor etc.
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(), 
            new TerserPlugin(),
            new HtmlWebpackPlugin({            //helps with connecting newly generated hashed script names
                template: "./src/template.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })   // It was built-it with webpack but overwritten by css optimizer up above
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }), 
        new CleanWebpackPlugin()
    ], //Deleting old hashed builds
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3.Extract css into files
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader" //1. Turns sass into css
                ]
            }
        ]
    }
});