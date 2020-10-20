import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { ValueOf } from "../../libs/common/declare";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { ApiResultToast } from "../molecules/ApiResultToast";
import { EventName } from "../molecules/EventName";
import { EventMemo } from "../molecules/EventMemo";
import { EventNichijiKouho } from "../molecules/EventNichijiKouho";
import { EventNichijiKouhoCalendar } from "../molecules/EventNichijiKouhoCalendar";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventAddCard: React.FC = () => {
    // ========================================================
    // グローバルのState
    // ========================================================
    // -------------------------------------
    // API実行結果
    // -------------------------------------
    const moyooshiAddApiSucceeded = useSelector<ApiExecutionState, ValueOf<typeof ApiExecutionStateType>>(
        // @ts-ignore
        (state: ApiExecutionState) => state.moyooshi.moyooshiAddApiStatus
    ); // @ts-ignoreが無いとエラー（moyooshiがない）になる。
    // const moyooshiAddApiSucceeded = useSelector<ApiExecutionState, ValueOf<typeof ApiExecutionStateType>> ((state) => state.moyooshiAddApiStatus);  // NG
    // const moyooshiAddApiSucceeded = useSelector((state: ApiExecutionState) => state.moyooshiAddApiStatus); // NG
    // -------------------------------------
    // APIからの返却データ
    // -------------------------------------
    const moyooshiAddApiReturnData = useSelector((state) => state.moyooshi.returnObject); // @ts-ignoreなくてもエラーにならない。anyだから？
    const schedule_update_id = moyooshiAddApiReturnData?.schedule_update_id;

    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // バリデーション関係
    // -------------------------------------
    const [validated, setValidated] = useState(false);
    // -------------------------------------
    // フォームの値
    // -------------------------------------
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");
    // -------------------------------------
    // Toast表示関係（登録完了のお知らせToast）
    // -------------------------------------
    const [showA, setShowA] = useState(false);
    const [toastHeader, setToastHeader] = useState<JSX.Element | null>(null);
    const [toastMessage, setToastMessage] = useState<JSX.Element | null>(null);
    const toggleShowA = () => setShowA(!showA);

    // ========================================================
    // Action dispatcher
    // ========================================================
    const dispatch = useDispatch();

    // ========================================================
    // 再レンダリング完了ごとの処理定義
    // ========================================================
    useEffect(() => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // 初期表示に起動
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    }, []);

    useEffect(() => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // API（イベント新規登録）実行時起動関数
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        if (moyooshiAddApiSucceeded === ApiExecutionStateType.SUCCEEDED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong>イベントの新規登録に成功しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(<ApiResultToast schedule_update_id={schedule_update_id} />);

            // ========================================================
            // Toastを表示させる
            // ========================================================
            setShowA(true);
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.FAILED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong>イベントの新規登録中にエラーが発生しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(
                <p className="mb-0">
                    <Badge variant="danger">残念</Badge>
                    えっと。。。また後日お試し下さい。。。
                </p>
            );

            // ========================================================
            // Toastを表示させる
            // ========================================================
            setShowA(true);
        }

        return () => {
            // ========================================================
            // 別画面遷移時はToastをOff
            // ========================================================
            setShowA(false);
        };
    }, [moyooshiAddApiSucceeded]);
    // });

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 送信ボタンクリックイベントハンドラ
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const handleSubmit = (event) => {
        event.preventDefault();

        // ========================================================
        // コンポーネントのState
        // ========================================================
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return false;
        }
        setValidated(true);

        // ========================================================
        // API実行アクション
        // ========================================================
        // -------------------------------------
        // イベント日時候補テキストエリアの内容を改行コードで分割
        // -------------------------------------
        const eventNichijiKouhoArray: string[] = eventNichijiKouho.split("\n");

        // -------------------------------------
        // モデルデータを作成してアクション実行
        // -------------------------------------
        const addedMoyooshi: Moyooshi = {
            name: eventName,
            memo: eventMemo,
            nichiji_kouho: eventNichijiKouhoArray,
        };
        dispatch(moyooshiSlice.actions.added(addedMoyooshi));
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Row className={"mt-5"}>
                <Col sm={12}>
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>{toastHeader}</Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </Col>
            </Row>

            <Card className={"mt-5 shadow rounded"}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <EventName valueSetter={setEventName}></EventName>
                                <EventMemo valueSetter={setEventMemo}></EventMemo>
                                <EventNichijiKouho value={eventNichijiKouho} valueSetter={setEventNichijiKouho}></EventNichijiKouho>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="pl-5" controlId="formCalendar">
                                <EventNichijiKouhoCalendar value={eventNichijiKouho} valueSetter={setEventNichijiKouho}></EventNichijiKouhoCalendar>
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">新規イベントを登録する</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
