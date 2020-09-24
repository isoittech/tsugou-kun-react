// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント新規登録Saga
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

import axios from 'axios'
import {put, call, fork, takeEvery, takeLatest} from 'redux-saga/effects'

import {
    ADD_EVENT,
    successFetchEventApi,
    failFetchEventApi, successAddEventApi, failAddEventApi
} from '../action/event'
import {EventAddRequest} from "../model/event";

const requestAddEventApi = async (data: EventAddRequest) => {
    console.log("async test requestAddEventApi 1")
    const url = 'http://localhost:3000/event'

    try {
        console.log("async test requestAddEventApi 2")
        const response = await axios.post(url, data)
        console.log("async test requestAddEventApi 3")
        const result = response
        return {result}

    } catch (error) {
        console.log("async test requestAddEventApi error 1")
        return {error}

    }

    // return axios
    //     .post(url, data)
    //     .then((response) => {
    //         const result = response.data.map((item) => item.name)
    //         return {result}
    //     })
    //     .catch((error) => {
    //         return {error}
    //     })
}

function* runRequest(action) {
    console.log("called generator function 'runRequest'.")
    const payLoad = action.payload
    // Apiが終わるまで待つ。
    const {result, error} = yield call(requestAddEventApi, payLoad);
    if (result && !error) {
        yield put(successAddEventApi({result}));
    } else {
        yield put(failAddEventApi({error}));
    }
}

export const addEventSaga = [takeLatest(ADD_EVENT, runRequest)]
