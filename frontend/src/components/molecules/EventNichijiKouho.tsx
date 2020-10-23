import React, { MutableRefObject, useState, forwardRef, useImperativeHandle } from "react";
import { Form } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

type Props = {
    value: string;
    valueSetter: (value: string) => void;
    validStatusSetter: (flg: boolean) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント日時候補編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
const EventNichijiKouho_: React.FC<Props> = ({ value = "", valueSetter, validStatusSetter }, ref: any) => {
    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // バリデーション関係
    // -------------------------------------
    const [touched, setTouched] = useState(false);
    const [valid, setValid] = useState(false);

    // ========================================================
    // スタイル
    // ========================================================
    let applyCssClass = "form-control";
    if (touched) {
        if (valid) applyCssClass += " is-valid";
        else applyCssClass += " is-invalid";
    }
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // イベントハンドラ
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // テキストエリアのonChange
    // ========================================================
    const onChangeInTextarea = (textAreaValue) => {
        valueSetter(textAreaValue);
        setTouched(true);
        setValid(textAreaValue !== "");
        validStatusSetter(textAreaValue !== "");
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // その他
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // Ref
    // ========================================================
    useImperativeHandle(ref, () => ({
        test: (txt) => {
            // tslint:disable-next-line: no-console
            console.log(`called log: ${txt}`);
        },
        onChangeInTextarea: (data) => onChangeInTextarea(data),
    }));

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        // 親コンポーネントからtextareaタグのonChangeハンドラを呼び出そうとするも、
        // 色々試した結果ダメで、結果的に生
        // <Form.Group controlId="formEventNichijiKouho">
        //     <Form.Label className="hissu">イベント日時候補</Form.Label>
        //     <Form.Control
        //         required
        //         as="textarea"
        //         rows={5}
        //         isValid={touched ? valid : false}
        //         isInvalid={touched ? !valid : false}
        //         onChange={(e) => {
        //             valueSetter(e.target.value);
        //             setTouched(true);
        //             setValid(e.target.value !== "");
        //             validStatusSetter(e.target.value !== "");
        //         }}
        //         defaultValue={value}
        //         ref={textArefRef}
        //     />
        //     <Form.Control.Feedback type="valid">OK</Form.Control.Feedback>
        //     <Form.Control.Feedback type="invalid">必須です。入力してください。</Form.Control.Feedback>
        // </Form.Group>
        <div className="form-group">
            <label className="hissu form-label" htmlFor="formEventNichijiKouho">
                イベント日時候補
            </label>
            <textarea
                required
                rows={5}
                id="formEventNichijiKouho"
                className={applyCssClass}
                onChange={(e) => onChangeInTextarea(e.target.value)}
                value={value}
            />
            {touched &&
                (valid ? (
                    <div className="valid-feedback">OK</div>
                ) : (
                    <div className="invalid-feedback">必須です。入力してください。</div>
                ))}
        </div>
    );
};

export const EventNichijiKouho = forwardRef(
    EventNichijiKouho_ as React.ForwardRefRenderFunction<HTMLTextAreaElement, Props>
);
