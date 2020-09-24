import {all} from 'redux-saga/effects'
import {addEventSaga} from "./event_add";

export default function* rootSaga() {
    yield all([...addEventSaga])
}