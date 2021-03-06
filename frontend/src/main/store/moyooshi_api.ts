import { ValueOf } from "../libs/common/declare";

export const ApiExecutionStateType = {
    MI: "MI",
    JIKKOU_CHU: "JIKKOU_CHU",
    SUCCEEDED: "SUCCEEDED",
    FAILED: "FAILED",
    READ_SUCCEEDED: "READ_SUCCEEDED",
    READ_FAILED: "READ_FAILED",
    UPDATE_SUCCEEDED: "UPDATE_SUCCEEDED",
    UPDATE_FAILED: "UPDATE_FAILED",
} as const;
// 「as const」というConstアサーションを利用。
// これを利用することで、後続の宣言moyooshiAddApiStatusの型が
// 「string」ではなくリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」となる。

// ValueOf: 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる自前の型。
export type ApiExecutionState = {
    // 下記は、moyooshiAddApiStatusの型を、
    // ApiExecutionStateTypeの中で定義したリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」にしてくれる。
    // ※前述「as const」と組み合わせる必要あり。
    moyooshiAddApiStatus: ValueOf<typeof ApiExecutionStateType>;
    // APIからの返却オブジェクト
    returnObject: any;
};
//
