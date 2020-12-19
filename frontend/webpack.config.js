const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BACKEND_PJ_HOME = `${__dirname}/../backend`;

module.exports = () => {
    // ------------------------------------------
    // 環境変数読み込み
    // ------------------------------------------
    dotenv.config();
    const envNodeEnv = process.env.NODE_ENV;
    const envBackendHost = process.env.HOST_URL;
    const envCookieExpiredMinutes = process.env.COOKIE_EXPIRED_MINUTES;

    // ------------------------------------------
    // 外部設定読み込み
    // ------------------------------------------
    // frontend/.envに存在する設定値をロード
    const env = dotenv.config().parsed;

    // webpack起動時に環境変数が指定されていたらそれで.envの内容を上書き
    if (envNodeEnv) env.NODE_ENV = envNodeEnv;
    if (envBackendHost) env.HOST_URL = envBackendHost;
    if (envCookieExpiredMinutes) env.COOKIE_EXPIRED_MINUTES = envCookieExpiredMinutes;

    // ------------------------------------------
    // モード・ビルド出力先決定
    // ------------------------------------------
    const outputPath = env.NODE_ENV === "production" ? `${BACKEND_PJ_HOME}/build` : `${__dirname}/dist`;
    const webpackMode = env.NODE_ENV === "production" ? "production" : "development";

    console.log(".env内容:");
    console.log(env);
    console.log(`webpackMode:${webpackMode}`);

    // ------------------------------------------
    // 本設定
    // ------------------------------------------
    return {
        // モード値を production に設定すると最適化された状態出力される。
        // 一方、development に設定するとソースマップ有効でJSファイルが出力される。
        mode: webpackMode,

        // メインとなるJavaScriptファイル（エントリーポイント）
        entry: "./src/main/main.tsx",

        // ファイルの出力設定
        output: {
            //  出力ファイルのディレクトリ名
            path: outputPath,
            // 出力ファイル名
            filename: "main.js",
            // HTMLのsrc/href属性出力時の先頭に付与する値
            // ※先頭スラッシュを指定しない場合、更新やリロード時に404となる。
            // publicPath: "/", // ---> やはり削った。テンプレートindex.htmlのhead/baseタグにてスラッシュを指定することにより不要となった。
        },

        plugins: [
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(env),
            }),
            new HtmlWebpackPlugin({
                template: "./src/main/index.html",
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
