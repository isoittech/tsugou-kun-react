// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント新規登録Saga
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
import axios from 'axios'
import {put, call, takeLatest} from 'redux-saga/effects'

import {MoyooshiAddRequest, MoyooshiAddResponse} from "../../libs/api/event_add/type";
import {moyooshiSlice} from "./moyooshi-slice";

const requestAddMoyooshiApi = async (data: MoyooshiAddRequest) => {
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
        const moyooshiAddResponse: MoyooshiAddResponse = {
            code: 'yeah',
            key: '01',
            succeed: true
        };
        yield put(moyooshiSlice.actions.moyooshiAddApiSucceeded(moyooshiAddResponse));
    } else {
        const moyooshiAddResponse: MoyooshiAddResponse = {
            code: 'boooo',
            key: '99',
            succeed: false
        };
        yield put(moyooshiSlice.actions.moyooshiAddApiFailed(moyooshiAddResponse));
    }
}

export const addMoyooshiSaga = [takeLatest(moyooshiSlice.actions.added, runRequest)]
