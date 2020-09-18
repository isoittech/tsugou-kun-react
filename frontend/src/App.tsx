import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as ReactDOM from 'react-dom';
import store from './store'
import {fetchEvent} from './action/event'
import {Provider} from "react-redux";

type Props = {
    foo: string;
}
//
// countryLists() {
//     return this.state.countries.map(country => {
//         return <li key={country}>{country}</li>
//     })
// }
//


// const render = () => {
//     this.unsubscribe()
//     return (
//         <ul>
//             {this.countryLists}
//         </ul>
//     )
// }

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

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
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}