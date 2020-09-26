import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";

import {EventEditCard} from "../organism/EventEditCard";

export const Edit: React.FC = () => {

    console.log("★Edit画面");

    // const handleBeforeUnload = (e) => {
    //     // 仕様標準のメソッドを呼び出す
    //     e.preventDefault();
    //     alert(`本当にいいのか？リロードして。`)
    //
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     // return () => {
    //     //     // 解除
    //     //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //     // }
    // }, [])　// 初回レンダリング時、一回だけ実行する

    return (
        <>
            <Helmet>
                <title>イベント編集 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>
            <div className=" row d-flex justify-content-center my-5">
                <div className="col-sm-10">
                    <EventEditCard/>
                </div>
            </div>
        </>
    )
}