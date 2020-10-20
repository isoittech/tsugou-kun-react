import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

type Props = {
  valueSetter: (value: string) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント名編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventName: React.FC<Props> = ({ valueSetter }) => {
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
    <Form.Group controlId="formEventName">
      <Form.Label className="hissu">イベント名</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="イベント名"
        onChange={(e) => {
          valueSetter(e.target.value);
        }}
      />
      <Form.Control.Feedback>OKです。</Form.Control.Feedback>
    </Form.Group>
  );
};
