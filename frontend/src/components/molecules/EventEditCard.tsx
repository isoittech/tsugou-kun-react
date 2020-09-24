import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Calendar, DayValue} from 'react-modern-calendar-datepicker';
import {Button, Card, Col, Form, Row, Toast} from 'react-bootstrap';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import {moyooshiSlice} from "../../features/moyooshi/moyooshi-slice";
import {Moyooshi} from "../../features/moyooshi/moyooshi-type";
import {ValueOf} from "../../libs/common/declare";
import {getToday} from "../../libs/common/datetime";
import {ApiExecutionState, ApiExecutionStateType} from "../../store/moyooshi_api";

export const EventEditCard: React.FC = () => {
    // ========================================================
    // グローバルのState
    // ========================================================
    // -------------------------------------
    // API実行結果
    // -------------------------------------
    const moyooshiAddApiSucceeded = useSelector<ApiExecutionState, ValueOf<typeof ApiExecutionStateType>>
        // @ts-ignore
        ((state: ApiExecutionState) => state.moyooshi.moyooshiAddApiStatus); // @ts-ignoreが無いとエラー（moyooshiがない）になる。
    // const moyooshiAddApiSucceeded = useSelector<ApiExecutionState, ValueOf<typeof ApiExecutionStateType>> ((state) => state.moyooshiAddApiStatus);  // NG
    // const moyooshiAddApiSucceeded = useSelector((state: ApiExecutionState) => state.moyooshiAddApiStatus); // NG

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
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [eventName, setEventName] = useState('');
    const [eventNichijiKouho, setEventNichijiKouho] = useState('');
    const [eventMemo, setEventMemo] = useState('');
    // -------------------------------------
    // Toast表示関係（登録完了のお知らせToast）
    // -------------------------------------
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);


    // ========================================================
    // Action dispatcher
    // ========================================================
    const dispatch = useDispatch();


    // ========================================================
    // 再レンダリング完了ごとの処理定義
    // ========================================================
    // -------------------------------------
    // 再レンダリング完了時にAPI実行結果により処理を変える
    // -------------------------------------
    useEffect(() => {
        if (moyooshiAddApiSucceeded === ApiExecutionStateType.SUCCEEDED) {
            setShowA(true)
        }
        // setShowA(!showA);
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
            nichiji_kouho: eventNichijiKouhoArray
        }
        dispatch(moyooshiSlice.actions.added(addedMoyooshi))
    };

    const onSelectedOnCalendar = (newValue: DayValue) => {
        const {year, month, day} = newValue
        const printedDate = `${eventNichijiKouho}\n${year}/${month}/${day} 19:00～`

        setSelectedDay(newValue)
        setEventNichijiKouho(printedDate.trim())
    }

    return (
        <>
            <Row className={"mt-5"}>
                <Col xs={6}>
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>
                            <strong className="mr-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>
                </Col>
            </Row>

            <Card className={"mt-5 shadow rounded"}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Group controlId="formEventName">
                                    <Form.Label>イベント名</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="イベント名"
                                        onChange={(e) => {
                                            setEventName(e.target.value)
                                        }}
                                    />
                                    <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEventMemo">
                                    <Form.Label>イベントメモ</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        onChange={(e) => {
                                            setEventMemo(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEventNichijiKouho">
                                    <Form.Label>イベント日時候補</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={5}
                                        onChange={(e) => {
                                            setEventNichijiKouho(e.target.value)
                                        }}
                                        defaultValue={eventNichijiKouho}
                                    />
                                    <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="pl-5" controlId="formCalendar">
                                <Form.Label>※選択するとイベント日時候補欄に日付が追記されます</Form.Label>
                                <Calendar
                                    value={selectedDay}
                                    onChange={onSelectedOnCalendar}
                                    shouldHighlightWeekends
                                    minimumDate={getToday()}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">新規イベントを登録する</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}