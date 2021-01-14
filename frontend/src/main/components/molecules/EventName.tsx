import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export type EventNameProps = {
    value?: string;
    valueSetter: (value: string) => void;
    validStatusSetter: (flg: boolean) => void;
    displayMode?: number;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント名編集フォーム部品
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
const EventNameForm: React.FC<EventNameProps> = ({ valueSetter, validStatusSetter, displayMode = 1, value = "" }) => {
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

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
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
                defaultValue={value}
            />
            <Form.Control.Feedback type="valid">OK</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">必須です。入力してください。</Form.Control.Feedback>
        </>
    );
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント名編集フォーム
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventName: React.FC<EventNameProps> = ({ displayMode = 1, ...props }: EventNameProps) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            {displayMode === 1 && (
                <Form.Group controlId="formEventName">
                    <Form.Label className="hissu">イベント名</Form.Label>
                    <EventNameForm {...props}></EventNameForm>
                </Form.Group>
            )}
            {displayMode === 2 && (
                <Form.Group as={Row} className={"mt-3"}>
                    <Form.Label column sm="3" className="hissu edit_label">
                        イベント名
                    </Form.Label>
                    <Col sm="9">
                        <EventNameForm {...props}></EventNameForm>
                    </Col>
                </Form.Group>
            )}
        </>
    );
};
