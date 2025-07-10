// const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { commonConfig, publicPaths } = require("./webpack.common.js");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const devConfig = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        publicPath: publicPaths.DEV,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Search Storefront Autocomplete",
            template: __dirname + "/public/index.html",
            inject: "body",
            filename: "index.html",
        }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(
                "https://catalog-service.adobe.io/graphql",
            ),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
});

module.exports = env => {
    if (env?.link) {
        return merge(devConfig, {
            resolve: {
                alias: {
                    "react": "preact-compat",
                    "react-dom": "preact-compat",
                },
            },
        });
    } else if (env?.analyze) {
        return merge(devConfig, {
            plugins: [new BundleAnalyzerPlugin()],
        });
    } else {
        return devConfig;
    }
};
