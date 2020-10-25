// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベントSlice
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Moyooshi } from "./moyooshi-type";
import { MoyooshiApiResponse } from "../../libs/api/event_add/type";
import { ApiExecutionState, ApiExecutionStateType } from "../../store/moyooshi_api";

const initialState: ApiExecutionState = {
    moyooshiAddApiStatus: ApiExecutionStateType.MI,
    returnObject: null,
};

export const moyooshiSlice = createSlice({
    name: "moyooshi",
    initialState: initialState,
    reducers: {
        // immerを利用してstore内のstateを更新している。
        // --> 各reducerで何も返さない場合、immerが裏でstateを更新する。
        // ※本来reducerでは新しいstateを返却するのが一般的。
        added: (state, action: PayloadAction<Moyooshi>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.JIKKOU_CHU;
        },
        updated: (state, action: PayloadAction<Moyooshi>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.JIKKOU_CHU;
        },
        read: (state, action: PayloadAction<string>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.JIKKOU_CHU;
        },
        moyooshiAddApiSucceeded: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.SUCCEEDED;
            state.returnObject = action.payload.returnObject;
        },
        moyooshiAddApiFailed: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.FAILED;
        },
        moyooshiUpdateApiSucceeded: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.UPDATE_SUCCEEDED;
            state.returnObject = action.payload.returnObject;
        },
        moyooshiUpdateApiFailed: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.UPDATE_FAILED;
        },
        moyooshiReadApiSucceeded: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.READ_SUCCEEDED;
            state.returnObject = action.payload.returnObject;
        },
        moyooshiReadApiFailed: (state, action: PayloadAction<MoyooshiApiResponse>) => {
            state.moyooshiAddApiStatus = ApiExecutionStateType.READ_FAILED;
        },
    },
});

//
