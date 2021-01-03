//
// Common/Logging - ロギング処理を行うパッケージ
//
// This software is released under the MIT License
//
import { format, transports, createLogger } from "winston";
import moment from "moment";

// ログのカスタムフォーマッタ
const formatter = format.printf(
    // ログ情報をフォーマットした文字列に展開する関数
    (info: any): string => {
        // 引数を展開する
        const {
            level, // デフォルトで level と message が渡る
            message,
            timestamp, // format.combine() で format.timestamp() 指定されている
            ...etc // その他の内容は JSON で表示する
        } = info;

        // フォーマットした文字列を返す
        return (
            `${moment(timestamp).format("YYYY-MM-DD HH:mm:ss")} [${level}] - ${message}` +
            `${etc && Object.keys(etc).length ? "\n" + JSON.stringify(etc, replacer, 2) : ""}`
        );
    }
);

// JSON.stringify のオブジェクトの翻訳関数
const replacer = (key: any, value: any): any => {
    // 関数なら "= function" と返す
    if (value instanceof Function) {
        return "= function";

        // undefined なら "= undefined" と返す
    } else if (value === undefined) {
        return "= undefined";
    }

    // 他のオブジェクト・配列はそのまま次へ
    return value;
};

// export dev - デバッグ用のロガー
export const logger = createLogger(
    // ロガーオプション
    {
        level: "debug",
        format: format.combine(
            format.timestamp(), // ログ情報に timestamp を付加する
            format.simple(), // テキスト行としてログを出す
            formatter // テキスト化するフォーマッタ
        ),
        transports: [
            new transports.Console({ level: "debug" }), // コンソールへ出力する
            new transports.File({ dirname: "logs", filename: "app.log", level: "debug" }),
        ],
    }
);
