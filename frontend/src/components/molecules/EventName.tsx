import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

type Props = {
    valueSetter: (value: string) => void;
    validStatusSetter: (flg: boolean) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント名編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventName: React.FC<Props> = ({ valueSetter, validStatusSetter }) => {
    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // バリデーション関係
    // -------------------------------------

    // 初期表示時、下記変数にはfalseが設定される。
    // フォームにaが入力された時、下記変数はWatch上ではunavailableとなる。
    // フォームにaが入力されてonChangeハンドラが終わったあと、下記行が実行される。その時にはtouchedにtrueが入っている。
    const [touched, setTouched] = useState(false);
    // 初期表示時、下記変数にはfalseが設定される。
    // フォームにaが入力された時、下記変数はWatch上ではunavailableとならず、falseが入っている。ただし、setValid（e.target.value !== "")が実行されても期待値のtrueにならない。
    // フォームにaが入力されてonChangeハンドラが終わったあと、下記行が実行される。その時にはvalidにtrueが入っている。
    const [valid, setValid] = useState(false);

    // ↑の観察の結果分かるのは、useState由来のハンドラがonChange内で実行されても、すぐにStateに反映されるわけではない。

    // 最初はinvalid
    // 文字が入力されたらvalid
    // 文字がなくなったらinvalid

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <Form.Group controlId="formEventName">
            <Form.Label className="hissu">イベント名</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="イベント名"
                isValid={touched ? valid : false}
                isInvalid={touched ? !valid : false}
                onChange={(e) => {
                    valueSetter(e.target.value);
                    setTouched(true);
                    setValid(e.target.value !== "");
                    validStatusSetter(e.target.value !== "");
                }}
            />
            <Form.Control.Feedback type="valid">OK</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">必須です。入力してください。</Form.Control.Feedback>
        </Form.Group>
    );
};
