// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// 本ファイルはメモ用である。
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

import axios from 'axios'
import {put, call, fork, takeEvery, takeLatest} from 'redux-saga/effects'

import {
    FETCH_EVENT,
    successFetchEventApi,
    failFetchEventApi
} from '../action/event'

const requestEventApi = () => {
    const url = 'http://localhost:3000/'

    return axios
        .get(url)
        .then((response) => {
            const country = response.data.map((item) => item.name)
            return {country}
        })
        .catch((error) => {
            return {error}
        })
}


// タスク(2)
function* runRequest() {
    // requestEventApiが終わるまで待つ。
    const {country, error} = yield call(requestEventApi);
    if (country && !error) {
        yield put(successFetchEventApi({country}));
    } else {
        yield put(failFetchEventApi({error}));
    }
}

// タスク(1)
// function* handleRequest() {
//     while (true) {
//         yield take(FETCH_EVENT);
//         yield fork(runRequest);
//     }
// }
// 上記を書き直したのが ↓↓↓
// FETCH_EVENTが発生するまで待つ。
// 発生したら（カブってる？）実行中のタスク(2)を中断し、タスク(2)を実行する。実行したら処理終了する（結果、すぐさまFETCH_EVENT発生を待つことになる）。
// ※takeLatestは連続で呼ばれた場合などで最新のものだけ実行する時に使う。
export const eventSaga = [takeLatest(FETCH_EVENT, runRequest)]

// takeEvery: actionが実行されるたびに関数を実行する
// takeLatest: 実行中の処理があったら中断し、新しく処理を開始する
// all: 配列で指定されたeffectを並列で実行する


// const requestCountryApi = async () => {
//     const url = 'https://restcountries.eu/rest/v2/all'
//
// try {
//     const response = await axios.get(url)
//     const country = response.data.map((item) => item.name)
//     return {country}
//
// } catch (error) {
//     return {error}
//
// }
// }
