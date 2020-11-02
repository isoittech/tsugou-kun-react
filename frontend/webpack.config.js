const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    // frontend/.envに設定値が存在する
    const env = dotenv.config().parsed;

    return {
        // モード値を production に設定すると最適化された状態出力される。
        // 一方、development に設定するとソースマップ有効でJSファイルが出力される。
        mode: env.NODE_ENV,

        // メインとなるJavaScriptファイル（エントリーポイント）
        entry: "./src/main.tsx",

        // ファイルの出力設定
        output: {
            //  出力ファイルのディレクトリ名
            path: `${__dirname}/dist`,
            // 出力ファイル名
            filename: "main.js",
        },

        plugins: [
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(env),
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
            }),
            new MiniCssExtractPlugin(),
        ],

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                // {
                //     test: /\.css/,
                //     use: [
                //         // linkタグに出力する機能
                //         "style-loader",
                //         {
                //             loader: "css-loader",
                //             options: {
                //                 // オプションでCSS内のurl()メソッドの取り込みを禁止する
                //                 url: false,
                //             },
                //         },
                //     ],
                // },
            ],
        },

        // import 文で .ts や .tsx ファイルを解決するため
        resolve: {
            // modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            port: 8787,
            historyApiFallback: true,
        },

        // developmentモードにおいてコンスパイル後リソースにオリジナルソースを含め、デバッグ効率化を図る指定
        // https://webpack.js.org/configuration/devtool/
        devtool: "inline-source-map", // build:slowest,  rebuild:slowest
        // devtool: "eval-source-map", // build:slowest,  rebuild:fast
        //
        // developmentモードｘdevtool指定の場合、バンドルファイルサイズが異なる。
        // developmentモードｘdevtool指定：数MB
        // developmentモードｘdevtool指定なし：2MB
        //  ※デバッグ時、見にくいコードになる。余計な文字列が変数名・関数名に付く。
        // productionモード：500KB
    };
};
