const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // モード値を production に設定すると最適化された状態出力される。
    // 一方、development に設定するとソースマップ有効でJSファイルが出力される。
    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/main.tsx",

    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/dist`,
        // 出力ファイル名
        filename: "main.js",
    },

    module: {
        rules: [
            {
                // 拡張子 .ts もしくは .tsx の場合
                test: /\.tsx?$/,
                // TypeScript をコンパイルする
                use: "ts-loader",
            },
            {
                test: /\.css/,
                use: [
                    // linkタグに出力する機能
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                        },
                    },
                ],
            },
        ],
    },

    // import 文で .ts や .tsx ファイルを解決するため
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8787,
        historyApiFallback: true,
    },

    devtool: "inline-source-map",
};
