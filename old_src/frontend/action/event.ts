import {createAction} from 'redux-actions';
import {EventAddRequest, EventAddResponse} from "../model/event";

export const EventActionType = {
    FETCH_EVENT: 'FETCH_EVENT',
    SUCCESS_FETCH_EVENT_API: 'SUCCESS_FETCH_EVENT_API',
    FAIL_FETCH_EVENT_API: 'FAIL_FETCH_EVENT_API',
    ADD_EVENT: 'ADD_EVENT',
    SUCCESS_ADD_EVENT_API: 'SUCCESS_ADD_EVENT_API',
    FAIL_ADD_EVENT_API: 'FAIL_ADD_EVENT_API',
} as const;
// 「as const」というConstアサーションを利用。
// これを利用することで、後続の宣言EventAction.typeの型が「string」ではなくリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」となる。

// 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる。
type ValueOf<T> = T[keyof T];

export type EventAction = {
    // 下記は、EventAction.typeの型を、EventActionTypeの中で定義したリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」にしてくれる。
    // ※前述「as const」と組み合わせる必要あり。
    type: ValueOf<typeof EventActionType>;
    items: any[]
};

// 名前は createAction だが作られるのは ActionCreator

export const fetchEvent = createAction(EventActionType.FETCH_EVENT);
export const successFetchEventApi = createAction(EventActionType.SUCCESS_FETCH_EVENT_API, (response: any) => response);
export const failFetchEventApi = createAction(EventActionType.FAIL_FETCH_EVENT_API, (error: any) => error);

export const addEvent = createAction(EventActionType.ADD_EVENT, (addedEvent: EventAddRequest) => addedEvent);
export const successAddEventApi = createAction(EventActionType.SUCCESS_ADD_EVENT_API, (response: any) => response);
export const failAddEventApi = createAction(EventActionType.FAIL_ADD_EVENT_API, (error: any) => error);
