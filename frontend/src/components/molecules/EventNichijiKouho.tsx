import React from "react";
import { Form } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

type Props = {
    value: string;
    valueSetter: (value: string) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント日時候補編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventNichijiKouho: React.FC<Props> = ({ value = "", valueSetter }) => {
    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // フォームの値
    // -------------------------------------

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <Form.Group controlId="formEventNichijiKouho">
            <Form.Label className="hissu">イベント日時候補</Form.Label>
            <Form.Control
                required
                as="textarea"
                rows={5}
                onChange={(e) => {
                    valueSetter(e.target.value);
                }}
                defaultValue={value}
            />
            <Form.Control.Feedback>OKです。</Form.Control.Feedback>
        </Form.Group>
    );
};
