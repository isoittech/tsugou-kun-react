import React, { MutableRefObject, useState, forwardRef, useImperativeHandle } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { CheckedBox, NichijiData } from "../../libs/common/declare";

type Props = {
    eventNichijiKouhoDeleteTargetChecks: CheckedBox;
    setEventNichijiKouhoDeleteTargetChecks: (value: CheckedBox) => void;
    eventNichijiKouhoDeleteTargets: NichijiData[];
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント日時候補削除フォーム
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventNichijiKouhoDelete: React.FC<Props> = ({
    setEventNichijiKouhoDeleteTargetChecks,
    eventNichijiKouhoDeleteTargetChecks,
    eventNichijiKouhoDeleteTargets,
}) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // イベントハンドラ
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================
    // 削除対象イベント日時候補のチェックボックスの状態に変化があったら起動
    // ========================================
    const onChangeOnCheckbox = (e) => {
        // checkedItemsのstateをセット
        setEventNichijiKouhoDeleteTargetChecks({
            ...eventNichijiKouhoDeleteTargetChecks,
            [e.target.id]: e.target.checked,
        });
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Form.Group as={Row} className={"mt-5"}>
                <Col sm="3">
                    <Form.Label className="edit_label">イベント日時削除</Form.Label>
                    <small className="form-text text-muted">
                        取り消したい日時があれば
                        <br />
                        選択してください
                    </small>
                </Col>
                <Col sm="9">
                    {eventNichijiKouhoDeleteTargets.map((nichijiData) => {
                        return (
                            <span style={{ display: "inline-block" }} className="mr-5" key={nichijiData.id}>
                                <input
                                    type="checkbox"
                                    name={`del_eve_dt_kouho_id_${nichijiData.id}`}
                                    id={`id_del_eve_dt_kouho_id_${nichijiData.id}`}
                                    value={nichijiData.id}
                                    onChange={onChangeOnCheckbox}
                                    checked={eventNichijiKouhoDeleteTargetChecks[nichijiData.id]}
                                />
                                {nichijiData.nichiji}
                            </span>
                        );
                    })}
                </Col>
            </Form.Group>
        </>
    );
};
