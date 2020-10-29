import React, { useState, useEffect, useRef, ElementRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { withCookies } from "react-cookie";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { ValueOf, EventInfo } from "../../libs/common/declare";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { ApiResultToast } from "../../components/molecules/ApiResultToast";
import { EventNichijiKouho } from "../../components/molecules/EventNichijiKouho";
import { EventAddCardPC } from "../../components/organism/EventAddCard";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventAddCard: React.FC<{ cookies?: any }> = ({ cookies }) => {
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
    // フォームの値
    // -------------------------------------
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");

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

    // ========================================================
    // 再レンダリング完了ごとの処理定義
    // ========================================================
    useEffect(() => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // レンダリング初回にのみ起動
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // textArefRef.current.focus();
        // textArefRef.current.onChange(); // 呼べない
        // textArefRef.current.test("test"); // 呼べた
    }, []);

    useEffect(() => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // 子コンポーネントの入力値検証結果変更時に起動
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        setValidated(eventNameIsValid && eventNichijiKouhoIsValid);
    }, [eventNameIsValid, eventNichijiKouhoIsValid]);

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

    useEffect(() => {
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
        // API実行結果返却時に起動
        // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
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
                name: moyooshiAddApiReturnData.added_moyooshi.name,
                scheduleUpdateId: moyooshiAddApiReturnData.schedule_update_id,
                nichijis: [],
            };
            // -------------------------------------
            // イベント候補日時
            // -------------------------------------
            moyooshiAddApiReturnData.added_nichiji_kouhos.map((kouho) => {
                eventInfo.nichijis.push(kouho.kouho_nichiji);
            });

            // ========================================================
            // Cookieへの設定
            // ========================================================
            cookies.set(`schedule_update_id_${moyooshiAddApiReturnData.added_moyooshi.id}`, eventInfo, {
                path: "/",
                expires: expiredDate,
            });
        }
    }, [moyooshiAddApiReturnData]);

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
        <EventAddCardPC
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
        ></EventAddCardPC>
    );
};

export default withCookies(EventAddCard);
