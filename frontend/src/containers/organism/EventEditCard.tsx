import React, { useState, useEffect, useRef, ElementRef } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DayValue } from "react-modern-calendar-datepicker";
import { Badge } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { moyooshiSlice } from "../../features/moyooshi/moyooshi-slice";
import { Moyooshi } from "../../features/moyooshi/moyooshi-type";
import { CheckedBox, NichijiData, ValueOf } from "../../libs/common/declare";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";
import { ApiResultToast } from "../../components/molecules/ApiResultToast";
import { EventNichijiKouho } from "../../components/molecules/EventNichijiKouho";
import { EventEditCardPC } from "../../components/organism/EventEditCard";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（編集）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
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
        // 下記処理にてイベント日時候補テキストエリアの内容を変更させている。（この変更自体は成功）
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
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <EventEditCardPC
            eventName={eventName}
            eventMemo={eventMemo}
            eventNichijiKouho={eventNichijiKouho}
            eventNichijiKouhoDeleteTargets={eventNichijiKouhoDeleteTargets}
            eventNichijiKouhoDeleteTargetChecks={eventNichijiKouhoDeleteTargetChecks}
            showA={showA}
            toastHeader={toastHeader}
            toastMessage={toastMessage}
            validated={validated}
            textArefRef={textArefRef}
            setEventName={setEventName}
            setEventMemo={setEventMemo}
            setEventNichijiKouho={setEventNichijiKouho}
            setEventNameIsValid={setEventNameIsValid}
            setEventNichijiKouhoDeleteTargetChecks={setEventNichijiKouhoDeleteTargetChecks}
            toggleShowA={toggleShowA}
            handleSubmit={handleSubmit}
            onCalendarClick={onCalendarClick}
        ></EventEditCardPC>
    );
};
