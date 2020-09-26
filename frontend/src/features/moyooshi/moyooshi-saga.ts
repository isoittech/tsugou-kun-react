// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント新規登録Saga
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
import axios from 'axios'
import {put, call, takeLatest} from 'redux-saga/effects'

import {MoyooshiApiResponse} from "../../libs/api/event_add/type";
import {moyooshiSlice} from "./moyooshi-slice";
import {Moyooshi} from "./moyooshi-type";

const requestAddMoyooshiApi = async (data: Moyooshi) => {
    const url = 'http://localhost:3000/moyooshi'

    try {
        const result = await axios.post(url, data)
        return {result}
    } catch (error) {
        return {error}
    }
}

function* runRequest(action) {
    const payLoad = action.payload
    // Apiが終わるまで待つ。
    const {result, error} = yield call(requestAddMoyooshiApi, payLoad);
    if (result && !error) {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'yeah',
            key: '01',
            succeed: true,
            returnObject: result.data.value,
        };
        yield put(moyooshiSlice.actions.moyooshiAddApiSucceeded(moyooshiApiResponse));
    } else {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'boooo',
            key: '99',
            succeed: false
        };
        yield put(moyooshiSlice.actions.moyooshiAddApiFailed(moyooshiApiResponse));
    }
}

const requestReadMoyooshiApi = async (schedule_update_id: string) => {
    const url = 'http://localhost:3000/moyooshi'

    try {
        const result = await axios.get(`${url}?schedule_update_id=${schedule_update_id}`)
        return {result}
    } catch (error) {
        return {error}
    }
}

function* runReadRequest(action) {
    const payLoad = action.payload
    // Apiが終わるまで待つ。
    const {result, error} = yield call(requestReadMoyooshiApi, payLoad);
    if (result && !error) {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'yeah',
            key: '01',
            succeed: true,
            returnObject: result.data.value,
        };
        yield put(moyooshiSlice.actions.moyooshiReadApiSucceeded(moyooshiApiResponse));
    } else {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'boooo',
            key: '99',
            succeed: false
        };
        yield put(moyooshiSlice.actions.moyooshiReadApiFailed(moyooshiApiResponse));
    }
}

const requestUpdateMoyooshiApi = async (data: Moyooshi) => {
    const url = 'http://localhost:3000/moyooshi'

    try {
        const result = await axios.put(url, data)
        return {result}
    } catch (error) {
        return {error}
    }
}

function* runUpdateRequest(action) {
    const payLoad = action.payload
    // Apiが終わるまで待つ。
    const {result, error} = yield call(requestUpdateMoyooshiApi, payLoad);
    if (result && !error) {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'yeah',
            key: '01',
            succeed: true,
            returnObject: result.data.value,
        };
        yield put(moyooshiSlice.actions.moyooshiUpdateApiSucceeded(moyooshiApiResponse));
    } else {
        const moyooshiApiResponse: MoyooshiApiResponse = {
            code: 'boooo',
            key: '99',
            succeed: false
        };
        yield put(moyooshiSlice.actions.moyooshiUpdateApiFailed(moyooshiApiResponse));
    }
}

export const moyooshiSaga = [
    takeLatest(moyooshiSlice.actions.added, runRequest),
    takeLatest(moyooshiSlice.actions.read, runReadRequest),
    takeLatest(moyooshiSlice.actions.updated, runUpdateRequest),
]
