import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Navigate, Route, Routes} from "react-router";
import {Button} from "react-bootstrap"; // ?
// import 'bootstrap/dist/css/bootstrap.min.css';

import {fetchEvent} from './action/event'
import {Header} from "./component/organism/Header";
import {Footer} from "./component/organism/Footer";
import {Top} from "./component/pages/Top";
import {Edit} from "./component/pages/Edit";

type Props = {
    foo: string;
}

export const App: React.FC<Props> = (props) => {

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {

        // useEffect(async () => {
        //     // ...
        //     await fetchEvent();
        //     // ...
        // }
        // Appコンポーネントロード完了時にfetchEventを実行したいとき、単純にuseEffectに渡すアロー関数に「async」を付けても動かない。
        // async で定義された非同期関数は、返り値に Promise オブジェクトを返す通常の関数のシンタックスシュガーであるため。
        // useEffectで返却すべきなのはEffectのキャンセルを行う関数である。Promise返却関数を返却しても動かない、ということ。
        // そのため、下記のように一旦関数定義を行い、その後叩くといった対応を行う。

        const runFetchEvent = async () => {
            // action.type=FETCH_EVENTのAction Creatorを実行 ---> イベント取得リクエスト実行
            await dispatch(fetchEvent())
        }

        runFetchEvent();
    });

    return (
        <>
            <Header foo={"サイト名"}></Header>
            <Routes>
                <Route path="/" element={<Top foo={"aiueo"}/>}/>
                <Route path="/edit/:key" element={<Edit/>}/>
                {/*どれにもマッチしなければTop画面へリダイレクト*/}
                <Route path="*" element={<Navigate to="/" replace />} />;
            </Routes>
            <Footer foo={"futta"}></Footer>
        </>
    )
}