import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const Dotenv = require("dotenv-webpack");

const config: Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, "build"),
        filename: "[name]-[chunkhash].js",
        assetModuleFilename: "images/[hash][ext][query]",
        publicPath: "/",
        clean: true,
    },
    cache: { type: "filesystem" },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx",
                    target: "es2015",
                    tsconfigRaw: require("./tsconfig.json"),
                },
            },
            {
                test: /\.(js|jsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "jsx",
                    target: "es2015",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "esbuild-loader",
                        options: {
                            loader: "css",
                            minify: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "./fonts/[name][ext]",
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: "es2015",
                css: true,
            }),
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new Dotenv(),
    ],
    devtool: false,
    performance: {
        hints: false,
    },
};

export default config;
