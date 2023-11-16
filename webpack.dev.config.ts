import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
/**
 * JavaScript 및 TypeScript 파일을 번들링. 속도가 빠름
 * esbuild는 여러 코어를 활용하여 병렬처리를 지원하고, 이전 결과를 캐싱하여 동일한 작업을 반복할 때 캐시된 결과를 재사용하여 성능을 향상시킴
 */
const { ESBuildMinifyPlugin } = require("esbuild-loader");
// 이 내용이 없으면, devServer 이하 내용에 대하여 에러 발생함
import "webpack-dev-server";
const webpack = require("webpack");
require("dotenv").config();

const config: Configuration = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, "build"),
        filename: "[name]-[chunkhash].js",
        assetModuleFilename: "images/[hash][ext][query]",
        publicPath: "/",
        clean: true,
    },
    cache: { type: "memory" },
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
    },
    plugins: [
        /**
         * HTML 파일을 생성하는 플러그인
         * 프론트엔드는 여러 JavaScript 및 CSS 파일을 번들링하여 단일 파일로 만들고,
         * 이 파일들을 HTML 파일에 자동으로 포함시켜야 함.
         * 1. HTML 파일을 생성 : 웹팩 빌드 시 번들링된 JavaScript 및 CSS 파일을 기반으로 HTML 파일을 자동으로 생성
         * 2. 인젝션 기능 : 번들된 자원들을 HTML 파일에 자동으로 포함시킴
         * 3. 다국어 지원 및 변수 주입: 동적 데이터를 HTML 파일에 주입
         */
        new HtmlWebpackPlugin({
            template: "public/index.html", //HTML 템플릿 파일 경로
            favicon: "public/favicon.ico",
            env: process.env,
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
        /**
         * 애플리케이션을 다시 로드하지 않고 모듈을 런타임(runtime)에서 교체하여 빠르게 개발 및 디버깅을 할 수 있도록 도와주는 기능
         * 개발 서버에서 코드 수정 시 전체 페이지를 새로고침하지 않고도 변경된 모듈만 업데이트하여 개발자에게 빠른 피드백을 제공
         * devServer 설정에서 hot: true로 설정하여 개발 서버에서 HMR을 활성화하도록 지정할 수 있음
         */
        new HotModuleReplacementPlugin(),
        /**
         * TypeScript 코드를 검사하고 타입 검사를 별도의 프로세스에서 실행하여 웹팩(Webpack) 빌드 성능을 향상시킴
         */
        new ForkTsCheckerWebpackPlugin({
            async: true,
        }),
        /**
         * 빌드 프로세스 중에 ESLint를 실행하여 JavaScript 파일을 검사하고 코드 스타일을 유지하도록 도와줌
         * 빌드할 때마다 웹팩으로 번들링하기 전에 JavaScript 파일을 ESLint로 검사할 수 있음
         */
        new ESLintPlugin({
            // context: "src", // 검사할 디렉터리 경로
            extensions: ["js", "jsx", "ts", "tsx"], // 검사할 파일 확장자
        }),
        // new Dotenv(),
    ],
    devtool: "eval-cheap-module-source-map",
    performance: {
        hints: false,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "build"),
        },
        historyApiFallback: true,
        port: process.env.REACT_APP_PORT,
        open: [`http://localhost:${process.env.REACT_APP_PORT}${process.env.REACT_APP_URL}`],
        hot: true,
        proxy: {
            "/tms-knp-notice/api/v1/ws": { changeOrigin: true, ws: true, target: "http://10.10.96.53" },
            "/media/api/v1/stream": { changeOrigin: true, ws: true, target: "http://10.10.96.53" },
            "/tms-knp-notice/api": { changeOrigin: true, target: "http://10.10.96.53" },
            "/media/api": { changeOrigin: true, target: "http://10.10.96.53" },
            "/tms-knp/api/": { changeOrigin: true, target: "http://10.10.96.53" },
            "/js": { changeOrigin: true, target: "http://10.10.96.53" },
            "/geoserver": { changeOrigin: true, target: "http://10.10.96.53" },
            "/auth": { changeOrigin: true, target: "http://10.10.96.53" },
        },
    },
};

export default config;
