const webpack = require("webpack");
const { merge } = require("webpack-merge");
const { commonConfig } = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "production",
    
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify("https://catalog-service.adobe.io/graphql"),
        }),
    ],
    optimization: {
        minimize: true,
    },
});
