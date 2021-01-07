import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Box, Container, CssBaseline, makeStyles } from "@material-ui/core";

import { Header } from "./components2/organism/Header";
import { Footer } from "./components2/organism/Footer";
import { Top } from "./components2/pages/Top";
import { Edit } from "./components2/pages/Edit";
import EventHistory from "./components/organism/EventHistory";

export const App: React.FC = () => {
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
        // const runFetchEvent = async () => {
        //     // action.type=FETCH_EVENTのAction Creatorを実行 ---> イベント取得リクエスト実行
        //     await dispatch(fetchEvent())
        // }
        //
        // runFetchEvent();
    });
    const classes = useStyles();

    return (
        <Container maxWidth={false} disableGutters className={classes.layout}>
            <CssBaseline />
            <Header></Header>
            <Box>
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="/edit/:key" element={<Edit />} />
                    {/*<Route path="/:key" element={<Edit/>}/>*/}
                    {/*どれにもマッチしなければTop画面へリダイレクト*/}
                    {/*<Route path="*" element={<Navigate to="/" replace/>}/>;*/}
                </Routes>
                <EventHistory></EventHistory>
            </Box>
            <Footer></Footer>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        // CSSのGrid機能を利用
        // 参考： https://www.archetyp.jp/blog/css-grid-2/
        display: "grid", // このコンテナ要素の直接の子要素がグリッド要素になる
        height: "100vh", // コンテンツ領域の高さをブラウザ表示高さいっぱいにする
        // auto：コンテンツ領域に合わせて伸縮。
        // [x]fr：auto指定した要素分の高さを除いた部分を、等分分割した要素をx個分の高さを割り当てる。
        // 下記だと、上部・中央・下部の3つの領域があり、上部・下部が自動計算、中央部がその残りが割り当てられる。
        // auto 1fr 3fr autoだった場合、上部・下部を除いた余りを4分割し、中央1に1個分・中央2に3個分が割り当てられる。
        gridTemplateRows: "auto 1fr auto",
        position: "relative",
    },
}));
