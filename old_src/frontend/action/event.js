import { createAction } from 'redux-actions';
export var FETCH_EVENT = 'FETCH_EVENT';
export var SUCCESS_FETCH_EVENT_API = 'SUCCESS_FETCH_EVENT_API';
export var FAIL_FETCH_EVENT_API = 'FAIL_FETCH_EVENT_API';
export var fetchEvent = createAction(FETCH_EVENT);
export var successFetchEventApi = createAction(SUCCESS_FETCH_EVENT_API, function (response) { return response; });
export var failFetchEventApi = createAction(FAIL_FETCH_EVENT_API, function (error) { return error; });
//
// export const fetchEvent = (): EventAction => ({
//     type: FETCH_EVENT,
//     items: []
// })
//
// export const successFetchEventApi = (response): EventAction => ({
//     type: SUCCESS_FETCH_EVENT_API,
//     items: response
// })
//
// export const failFetchEventApi = (error): EventAction => ({
//     type: FAIL_FETCH_EVENT_API,
//     items: error
// })
//# sourceMappingURL=moyooshi.js.map