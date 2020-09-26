import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {all} from "redux-saga/effects";

import {moyooshiSlice} from "../features/moyooshi/moyooshi-slice";
import {moyooshiSaga} from "../features/moyooshi/moyooshi-saga";

const rootReducer = combineReducers({
    moyooshi: moyooshiSlice.reducer,
});

function* rootSaga() {
    yield all([...moyooshiSaga])
}

export default function setupStore() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [...getDefaultMiddleware(), sagaMiddleware];

    const store = configureStore({
        reducer: rootReducer,
        middleware: middlewares,
    });
    sagaMiddleware.run(rootSaga);
    return store;
};
