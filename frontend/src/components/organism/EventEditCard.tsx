import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import { Badge, Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { ValueOf } from "../../libs/common/declare";
import { getToday } from "../../libs/common/datetime";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { useParams } from "react-router";
import { ApiResultToast } from "../molecules/ApiResultToast";

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
    // バリデーション関係
    // -------------------------------------
    const [validated, setValidated] = useState(false);
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
            schedule_update_id: schedule_update_id,
        };
        dispatch(moyooshiSlice.actions.updated(updatedMoyooshi));
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // カレンダー日付クリック時イベントハンドラ
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onSelectedOnCalendar = (newValue: DayValue) => {
        const { year, month, day } = newValue;
        const printedDate = `${eventNichijiKouho}\n${year}/${month}/${day} 19:00～`;

        setSelectedDay(newValue);
        setEventNichijiKouho(printedDate.trim());
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 削除対象イベント日時候補のチェックボックスの状態に変化があったら起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onChangeOnCheckbox = (e) => {
        //checkedItemsのstateをセット
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
                        <Form.Group as={Row} className={"mt-3"}>
                            <Form.Label column sm="3" className="hissu edit_label">
                                イベント名
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="イベント名"
                                    onChange={(e) => {
                                        setEventName(e.target.value);
                                    }}
                                    defaultValue={eventName}
                                />
                                <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className={"mt-5"}>
                            <Form.Label column sm="3" className="edit_label">
                                イベントメモ
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    onChange={(e) => {
                                        setEventMemo(e.target.value);
                                    }}
                                    defaultValue={eventMemo}
                                />
                                <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

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
                                        <Calendar
                                            value={selectedDay}
                                            onChange={onSelectedOnCalendar}
                                            shouldHighlightWeekends
                                            minimumDate={getToday()}
                                        />
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
