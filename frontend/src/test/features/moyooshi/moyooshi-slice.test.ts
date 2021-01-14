import { moyooshiSlice } from "../../../main/features/moyooshi/moyooshi-slice";
import { ApiExecutionStateType } from "../../../main/store/moyooshi_api";

describe("reducers", () => {
    describe("added", () => {
        it("addedアクション発行時、API実行ステータスが「実行中（JIKKOU_CHU）」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(initialStatus, moyooshiSlice.actions.added());

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.JIKKOU_CHU);
        });
    });

    describe("updated", () => {
        it("updatedアクション発行時、API実行ステータスが「実行中（JIKKOU_CHU）」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(initialStatus, moyooshiSlice.actions.updated());

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.JIKKOU_CHU);
        });
    });

    describe("read", () => {
        it("readアクション発行時、API実行ステータスが「実行中（JIKKOU_CHU）」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(initialStatus, moyooshiSlice.actions.read());

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.JIKKOU_CHU);
        });
    });

    // TODO
    // 以降6つ、同じ内容を繰り返すだけであり冗長。
    // リフレクション的な（メタプログラミング的な）機能でまとめられないだろうか。
    describe("moyooshiAddApiSucceeded", () => {
        it("moyooshiAddApiSucceededアクション発行時、API実行ステータスが「SUCCEEDED」となり、かつ、stateのデータが正しく更新される", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiAddApiSucceeded({ returnObject: { dummyKey: "dummy" }, succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.SUCCEEDED);
            expect(result.returnObject.dummyKey).toEqual("dummy");
        });
    });
    describe("moyooshiUpdateApiSucceeded", () => {
        it("moyooshiUpdateApiSucceededアクション発行時、API実行ステータスが「UPDATE_SUCCEEDED」となり、かつ、stateのデータが正しく更新される", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiUpdateApiSucceeded({ returnObject: { dummyKey: "dummy" }, succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.UPDATE_SUCCEEDED);
            expect(result.returnObject.dummyKey).toEqual("dummy");
        });
    });
    describe("moyooshiReadApiSucceeded", () => {
        it("moyooshiReadApiSucceededアクション発行時、API実行ステータスが「READ_SUCCEEDED」となり、かつ、stateのデータが正しく更新される", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiReadApiSucceeded({ returnObject: { dummyKey: "dummy" }, succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.READ_SUCCEEDED);
            expect(result.returnObject.dummyKey).toEqual("dummy");
        });
    });
    describe("moyooshiAddApiFailed", () => {
        it("moyooshiAddApiFailedアクション発行時、API実行ステータスが「FAILED」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiAddApiFailed({ succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.FAILED);
        });
    });
    describe("moyooshiUpdateApiFailed", () => {
        it("moyooshiUpdateApiFailedアクション発行時、API実行ステータスが「UPDATE_FAILED」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiUpdateApiFailed({ succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.UPDATE_FAILED);
        });
    });
    describe("moyooshiReadApiFailed", () => {
        it("moyooshiReadApiFailedアクション発行時、API実行ステータスが「READ_FAILED」となる", () => {
            const initialStatus = { moyooshiAddApiStatus: ApiExecutionStateType.MI, returnObject: undefined };
            const result = moyooshiSlice.reducer(
                initialStatus,
                moyooshiSlice.actions.moyooshiReadApiFailed({ succeed: true })
            );

            expect(result.moyooshiAddApiStatus).toEqual(ApiExecutionStateType.READ_FAILED);
        });
    });
});
