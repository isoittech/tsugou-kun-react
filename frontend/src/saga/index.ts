import { all } from 'redux-saga/effects'
import { eventSaga } from '../saga/event'

export default function* rootSaga() {
    // effectを並列処理する
    // ...effectって？
    yield all([...eventSaga])
}