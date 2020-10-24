import React, { useState, useEffect, useRef, ElementRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DayValue } from "react-modern-calendar-datepicker";
import { Badge, Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { ValueOf } from "../../libs/common/declare";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { ApiResultToast } from "../molecules/ApiResultToast";
import { EventName } from "../molecules/EventName";
import { EventMemo } from "../molecules/EventMemo";
import { EventNichijiKouhoCalendar } from "../molecules/EventNichijiKouhoCalendar";
import { EventNichijiKouho } from "../molecules/EventNichijiKouho";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（編集）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventEditCard: React.FC = () => {
    const { key } = useParams();
    const schedule_update_id = key;

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
    // -------------------------------------
    // APIからの返却データ
    // -------------------------------------
    const moyooshiAddApiReturnData = useSelector((state) => state.moyooshi.returnObject); // @ts-ignoreなくてもエラーにならない。anyだから？
    const readMoyooshi = moyooshiAddApiReturnData?.read_moyooshi;

    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // フォームの値
    // -------------------------------------
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");
    type NichijiData = {
        id: string;
        nichiji: string;
    };
    const [eventNichijiKouhoDeleteTargets, setEventNichijiKouhoDeleteTargets] = useState<NichijiData[]>([]);
    const [eventNichijiKouhoDeleteTargetChecks, setEventNichijiKouhoDeleteTargetChecks] = useState({});

    // -------------------------------------
    // バリデーション関係
    // -------------------------------------
    const [validated, setValidated] = useState(false);
    const [eventNameIsValid, setEventNameIsValid] = useState(false);

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
    // その他
    // ========================================================
    // -------------------------------------
    // Ref
    // -------------------------------------
    const textArefRef: any = useRef<ElementRef<typeof EventNichijiKouho>>(null);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 初回レンダリング時起動関数
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        dispatch(moyooshiSlice.actions.read(schedule_update_id));
    }, []); // 「初回のみ」をこの行の[]で制御

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // API実行時起動関数
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        if (moyooshiAddApiSucceeded === ApiExecutionStateType.UPDATE_SUCCEEDED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong>イベント情報の更新に成功しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(<ApiResultToast schedule_update_id={schedule_update_id} />);

            // ========================================================
            // Toastを表示させる
            // ========================================================
            setShowA(true);

            // ========================================================
            // 更新後の情報を取得するため再読込のためのディスパッチ
            // ========================================================
            dispatch(moyooshiSlice.actions.read(schedule_update_id));
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.UPDATE_FAILED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong>イベント情報の更新中にエラーが発生しました。</strong>);
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
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.READ_SUCCEEDED) {
            // ========================================================
            // 編集対象データをフォームにデフォルト設定
            // ========================================================
            // -------------------------------------
            // イベント日時候補
            // -------------------------------------
            const tempArray: NichijiData[] = [];
            readMoyooshi.MoyooshiKouhoNichijis.forEach((MoyooshiKouhoNichiji) =>
                tempArray.push({
                    id: MoyooshiKouhoNichiji.id,
                    nichiji: MoyooshiKouhoNichiji.kouho_nichiji,
                })
            );
            setEventNichijiKouhoDeleteTargets(tempArray);
            // -------------------------------------
            // イベント名
            // -------------------------------------
            setEventName(readMoyooshi.name);
            // -------------------------------------
            // イベントメモ
            // -------------------------------------
            setEventMemo(readMoyooshi.memo);
            // -------------------------------------
            // イベント日時候補
            // -------------------------------------
            setEventNichijiKouho(""); // 更新後の再レンダリング時には空になっているべき。
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.READ_FAILED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong>編集対象イベント情報取得中にエラーが発生しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(
                <p className="mb-0">
                    <Badge variant="danger">残念</Badge>
                    えっと。。。また後日お試し下さい。。。
                </p>
            );
            setShowA(true);
        }

        return () => {
            // ========================================================
            // 別画面遷移時はToastをOff
            // ========================================================
            setShowA(false);
        };
    }, [moyooshiAddApiSucceeded]);

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
        const updatedMoyooshi: Moyooshi = {
            id: readMoyooshi.id,
            name: eventName,
            memo: eventMemo,
            nichiji_kouho: eventNichijiKouhoArray,
            deleted_nichiji_kouho: eventNichijiKouhoDeleteTargetChecks,
            schedule_update_id,
        };
        dispatch(moyooshiSlice.actions.updated(updatedMoyooshi));
    };

    const onCalendarClick = (dateAtClicked: DayValue) => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // カレンダーがクリックされた時に起動
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        const { year, month, day } = dateAtClicked;

        let printedDate = null;
        if (eventNichijiKouho) printedDate = `${eventNichijiKouho}\n${year}/${month}/${day} 19:00～`;
        else printedDate = `${year}/${month}/${day} 19:00～`;

        // (1)
        // 下記処理にてイベント日時候補テキストエリアの内容を変化させている。
        // そのため、当該フォームのonChangeハンドラが起動されることを期待したがダメらしい。
        // https://qiita.com/ayato077/items/a7c82a7f62b533fe45c2
        // setEventNichijiKouho(printedDate);

        // (2)
        // なので代わりにDOM操作を行って手動（？）でイベント発火させる。
        // const domEvent = new Event("change");
        // const txtAreaNichijiKouho = document.getElementById("formEventNichijiKouho");
        // txtAreaNichijiKouho.dispatchEvent(domEvent);
        // -> 上記の試みではだめだった。

        // (1)と(2)の組み合わせでだめだったので、下記で同時にやる。
        textArefRef.current.onChangeInTextarea(printedDate);
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 削除対象イベント日時候補のチェックボックスの状態に変化があったら起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onChangeOnCheckbox = (e) => {
        // checkedItemsのstateをセット
        setEventNichijiKouhoDeleteTargetChecks({
            ...eventNichijiKouhoDeleteTargetChecks,
            [e.target.id]: e.target.checked,
        });
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
                        <EventName
                            value={eventName}
                            displayMode={2}
                            valueSetter={setEventName}
                            validStatusSetter={setEventNameIsValid}
                        ></EventName>
                        <EventMemo value={eventMemo} displayMode={2} valueSetter={setEventMemo}></EventMemo>

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

                        <Form.Group as={Row} className={"mt-5"}>
                            <Col sm="3">
                                <Form.Label className="edit_label">イベント日時追加</Form.Label>
                                <small className="form-text text-muted">
                                    追加したい日時があれば
                                    <br />
                                    入力してください
                                </small>
                            </Col>
                            <Col sm="9">
                                <Form.Group as={Row}>
                                    <Col sm="6">
                                        <Form.Control
                                            as="textarea"
                                            rows={12}
                                            onChange={(e) => {
                                                setEventMemo(e.target.value);
                                            }}
                                            defaultValue={eventNichijiKouho}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <EventNichijiKouhoCalendar
                                            clickedHandler={onCalendarClick}
                                        ></EventNichijiKouhoCalendar>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>

                        <Form.Group className="form-row mt-2 float-right">
                            <Button type="submit">イベント情報を修正する</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
