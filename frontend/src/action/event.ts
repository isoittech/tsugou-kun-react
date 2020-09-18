import {createAction} from 'redux-actions';

export const FETCH_EVENT = 'FETCH_EVENT'
export const SUCCESS_FETCH_EVENT_API = 'SUCCESS_FETCH_EVENT_API'
export const FAIL_FETCH_EVENT_API = 'FAIL_FETCH_EVENT_API'

export interface EventAction {
    type: string,
    items: any[]
}

export const fetchEvent = createAction(FETCH_EVENT);
export const successFetchEventApi = createAction(SUCCESS_FETCH_EVENT_API, (response: any) => response);
export const failFetchEventApi = createAction(FAIL_FETCH_EVENT_API, (error: any) => error);


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
