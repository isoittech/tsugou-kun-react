import React, { useState, useEffect, useRef, ElementRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { withCookies } from "react-cookie";
import { useParams } from "react-router";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { ValueOf, EventInfo, NichijiData, CheckedBox } from "../../libs/common/declare";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { ApiResultToast } from "../../components/molecules/ApiResultToast";
import { EventNichijiKouho } from "../../components/molecules/EventNichijiKouho";
import { EventCardPC } from "../../components/organism/EventCard";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベントフォーム
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventCard: React.FC<{ cookies?: any }> = ({ cookies }) => {
    // ========================================================
    // パラメータ
    // ========================================================
    const { key } = useParams();
    const paramScheduleUpdateId = key;
    const isEditMode = key !== undefined && key !== null;

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
    const scheduleUpdateId = moyooshiAddApiReturnData?.schedule_update_id;
    const readMoyooshi = moyooshiAddApiReturnData?.moyooshi;

    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // フォームの値
    // -------------------------------------
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");

    const [eventNichijiKouhoDeleteTargets, setEventNichijiKouhoDeleteTargets] = useState<NichijiData[]>([]);
    const [eventNichijiKouhoDeleteTargetChecks, setEventNichijiKouhoDeleteTargetChecks] = useState<CheckedBox>({});

    // -------------------------------------
    // バリデーション関係
    // -------------------------------------
    const [validated, setValidated] = useState(false);
    const [eventNameIsValid, setEventNameIsValid] = useState(false);
    const [eventNichijiKouhoIsValid, setEventNichijiKouhoIsValid] = useState(false);

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
    // レンダリング初回にのみ起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        // textArefRef.current.focus();
        // textArefRef.current.onChange(); // 呼べない
        // textArefRef.current.test("test"); // 呼べた
        if (isEditMode) dispatch(moyooshiSlice.actions.read(paramScheduleUpdateId)); // 編集画面のみ
    }, []); // 「初回のみ」をこの行の[]で制御

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 子コンポーネントの入力値検証結果変更時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        // 同じ入力フォーム群であっても、モードによって必須チェック対象が異なるため
        if (isEditMode) setValidated(eventNameIsValid);
        else setValidated(eventNameIsValid && eventNichijiKouhoIsValid);
    }, [eventNameIsValid, eventNichijiKouhoIsValid]);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // API（イベント新規登録）実行時起動関数
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        if (moyooshiAddApiSucceeded === ApiExecutionStateType.SUCCEEDED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong className={"mr-auto"}>イベントの新規登録に成功しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(<ApiResultToast schedule_update_id={scheduleUpdateId} />);

            // ========================================================
            // Cookie更新
            // ========================================================
            // -------------------------------------
            // 設定用情報準備
            // -------------------------------------
            const moyooshiName = moyooshiAddApiReturnData.moyooshi.name;
            const moyooshiTableId = moyooshiAddApiReturnData.moyooshi.id;
            const scheduleUpdateIdForCookie = moyooshiAddApiReturnData.schedule_update_id;
            const nichijiKouhos = moyooshiAddApiReturnData.nichiji_kouhos;
            // -------------------------------------
            // 更新関数実行
            // -------------------------------------
            updateCookie(moyooshiTableId, scheduleUpdateIdForCookie, moyooshiName, nichijiKouhos);

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
            setToastHeader(<strong className={"mr-auto"}>イベントの新規登録中にエラーが発生しました。</strong>);
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
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.UPDATE_SUCCEEDED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong className={"mr-auto"}>イベント情報の更新に成功しました。</strong>);
            // -------------------------------------
            // 内容
            // -------------------------------------
            setToastMessage(<ApiResultToast schedule_update_id={paramScheduleUpdateId} />);

            // ========================================================
            // Cookie更新
            // ========================================================
            // -------------------------------------
            // 設定用情報準備
            // -------------------------------------
            const moyooshiName = moyooshiAddApiReturnData.moyooshi.name;
            const moyooshiTableId = moyooshiAddApiReturnData.moyooshi.id;
            const scheduleUpdateIdForCookie = moyooshiAddApiReturnData.schedule_update_id;
            const nichijiKouhos = moyooshiAddApiReturnData.nichiji_kouhos;
            // -------------------------------------
            // 更新関数実行
            // -------------------------------------
            updateCookie(moyooshiTableId, scheduleUpdateIdForCookie, moyooshiName, nichijiKouhos);

            // ========================================================
            // Toastを表示させる
            // ========================================================
            setShowA(true);

            // ========================================================
            // 更新後の情報を取得するため再読込のためのディスパッチ
            // ========================================================
            dispatch(moyooshiSlice.actions.read(paramScheduleUpdateId));
        } else if (moyooshiAddApiSucceeded === ApiExecutionStateType.UPDATE_FAILED) {
            // ========================================================
            // Toast表示内容設定処理
            // ========================================================
            // -------------------------------------
            // ヘッダタイトル
            // -------------------------------------
            setToastHeader(<strong className={"mr-auto"}>イベント情報の更新中にエラーが発生しました。</strong>);
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
            readMoyooshi.MoyooshiKouhoNichijis.forEach((moyooshiKouhoNichiji) => {
                if (moyooshiKouhoNichiji.kouho_nichiji) {
                    // サーバ側ではレコードを物理削除ではなく論理削除している。
                    // そのため、「論理削除されていない」レコードを表示対象とする。
                    tempArray.push({
                        id: moyooshiKouhoNichiji.id,
                        nichiji: moyooshiKouhoNichiji.kouho_nichiji,
                    });
                }
            });
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
            setToastHeader(<strong className={"mr-auto"}>編集対象イベント情報取得中にエラーが発生しました。</strong>);
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
    // API実行結果返却時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const updateCookie = (moyooshiTableId, scheduleUpdateIdForCookie, moyooshiName, nichijiKouhos) => {
        if (moyooshiAddApiReturnData) {
            // ========================================================
            // Cookieへの設定値準備
            // ========================================================
            // -------------------------------------
            // Cookie有効期限
            // -------------------------------------
            const expiredDate = new Date();
            // expiredDate.setMonth(expiredDate.getMonth() + 3); // 有効期限：3ヶ月
            // expiredDate.setDate(expiredDate.getDate() + 1); // 有効期限：1日
            expiredDate.setMinutes(expiredDate.getMinutes() + 3); // 有効期限：3分

            // -------------------------------------
            // Cookieの器・設定値格納
            // -------------------------------------
            const eventInfo: EventInfo = {
                name: moyooshiName,
                scheduleUpdateId: scheduleUpdateIdForCookie,
                nichijis: [],
            };
            // -------------------------------------
            // イベント候補日時
            // -------------------------------------
            nichijiKouhos.map((kouho) => {
                eventInfo.nichijis.push(kouho.kouho_nichiji);
            });

            // ========================================================
            // Cookieへの設定
            // ========================================================
            cookies.set(`schedule_update_id_${moyooshiTableId}`, eventInfo, {
                path: "/",
                expires: expiredDate,
            });
        }
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // カレンダーがクリックされた時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onCalendarClick = (dateAtClicked: DayValue) => {
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

        // ========================================================
        // モデルデータを作成してアクション実行
        // ========================================================
        if (isEditMode) {
            // -------------------------------------
            // イベント情報編集
            // -------------------------------------
            const updatedMoyooshi: Moyooshi = {
                id: readMoyooshi.id,
                name: eventName,
                memo: eventMemo,
                nichiji_kouho: eventNichijiKouhoArray,
                deleted_nichiji_kouho: eventNichijiKouhoDeleteTargetChecks,
                schedule_update_id: paramScheduleUpdateId,
            };
            dispatch(moyooshiSlice.actions.updated(updatedMoyooshi));
        } else {
            // -------------------------------------
            // イベント情報追加
            // -------------------------------------
            const addedMoyooshi: Moyooshi = {
                name: eventName,
                memo: eventMemo,
                nichiji_kouho: eventNichijiKouhoArray,
            };
            dispatch(moyooshiSlice.actions.added(addedMoyooshi));
        }
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <EventCardPC
            isAdd={!isEditMode}
            eventName={eventName}
            eventMemo={eventMemo}
            eventNichijiKouhoDeleteTargets={eventNichijiKouhoDeleteTargets}
            eventNichijiKouhoDeleteTargetChecks={eventNichijiKouhoDeleteTargetChecks}
            setEventNichijiKouhoDeleteTargetChecks={setEventNichijiKouhoDeleteTargetChecks}
            eventNichijiKouho={eventNichijiKouho}
            showA={showA}
            toastHeader={toastHeader}
            toastMessage={toastMessage}
            validated={validated}
            textArefRef={textArefRef}
            setEventName={setEventName}
            setEventMemo={setEventMemo}
            setEventNichijiKouho={setEventNichijiKouho}
            setEventNameIsValid={setEventNameIsValid}
            setEventNichijiKouhoIsValid={setEventNichijiKouhoIsValid}
            toggleShowA={toggleShowA}
            handleSubmit={handleSubmit}
            onCalendarClick={onCalendarClick}
        ></EventCardPC>
    );
};

export default withCookies(EventCard);
