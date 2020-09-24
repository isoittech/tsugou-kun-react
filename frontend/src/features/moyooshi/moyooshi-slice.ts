import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Moyooshi} from "./moyooshi-type";
import {MoyooshiAddResponse} from "../../libs/api/event_add/type";
import {ApiExecutionState, ApiExecutionStateType} from "../../store/moyooshi_api";


const initialState: ApiExecutionState = {
    moyooshiAddApiStatus: ApiExecutionStateType.MI
};

export const moyooshiSlice = createSlice({
    name: 'moyooshi',
    initialState: initialState,
    reducers: {
        // immerを利用している。
        // --> 各reducerで何も返さない場合、immerが裏でstateを更新する。
        added: (
            state,
            action: PayloadAction<Moyooshi>
        ) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.JIKKOU_CHU;
        },
        moyooshiAddApiSucceeded: (
            state,
            action: PayloadAction<MoyooshiAddResponse>
        ) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.SUCCEEDED;
        },
        moyooshiAddApiFailed: (
            state,
            action: PayloadAction<MoyooshiAddResponse>
        ) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.FAILED
        },
    },
});

//