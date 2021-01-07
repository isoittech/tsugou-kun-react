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
        display: "grid",
        height: "100vh",
        gridTemplateRows: "auto 1fr auto",
        position: "relative",
    },
}));
