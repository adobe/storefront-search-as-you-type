const path = require("path");
const pkg = require("./package.json");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const createStyledComponentsTransformer =
    require("typescript-plugin-styled-components").default;

const styledComponentsTransformer = createStyledComponentsTransformer();

const banner = `${pkg.name}@v${pkg.version}`;
const MAJOR_VERSION = `v${pkg.version.split(".")[0]}`;
const PORT = 1234;

const publicPaths = {
    DEV: `http://localhost:1234/${MAJOR_VERSION}/`,
};

const plugins = [
    new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
    }),
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
    }),
];

const commonConfig = {
    entry: {
        SearchAsYouType: "./src/LiveSearchAutocomplete.tsx",
    },
    output: {
        filename: "SearchAsYouType.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd",
        globalObject: "self",
    },
    resolve: {
        modules: ["src", "node_modules"],
        alias: {
            "components": path.resolve(__dirname, "src/components/"),
            "hooks": path.resolve(__dirname, "src/hooks/"),
            "styles": path.resolve(__dirname, "src/styles/"),
            "utils": path.resolve(__dirname, "src/utils/"),
            "react": "preact/compat",
            "react-dom": "preact/compat",
            // Add aliases here if needed -->  `alias: path.resolve(__dirname, "src/alias-path"),`
        },
        extensions: [
            ".tsx",
            ".ts",
            ".js",
            ".jsx",
            ".svg",
            ".css",
            ".json",
            ".mdx",
        ],
    },
    target: "web",
    watchOptions: {
        aggregateTimeout: 100, // delay before reloading
        ignored: ["src/.DS_Store", "**/.DS_Store", "**/node_modules"],
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
        allowedHosts: ["magento2.test", "magento.test", "search.test"],
        client: {
            webSocketURL: `ws://localhost:${PORT}/ws`,
        },
        static: {
            directory: path.join(__dirname, "dist"),
        },
        server: "http",
        hot: true,
        liveReload: false,
        open: [`${publicPaths.DEV}index.html`],
        watchFiles: ["src/**/*", "public/**/*"],
        port: PORT,
        host: "0.0.0.0",
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            getCustomTransformers: () => ({
                                before: [styledComponentsTransformer],
                            }),
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                enforce: "pre",
                type: "javascript/auto",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/,
                type: "javascript/auto",
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ["url-loader"],
            },
        ],
    },
    plugins,
    performance: {
        hints: false,
    },
    stats: "errors-only",
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: {
                    banner: banner,
                },
            }),
        ],
    },
};

module.exports = { commonConfig, publicPaths };
