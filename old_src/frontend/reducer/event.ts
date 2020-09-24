import {
    EventAction,
    EventActionType
} from '../action/event'


export type EventState = {
    type: String,
    items: any[]
}


const eventState = (state: EventState = {type: '', items: []}, action: EventAction) => {
    switch (action.type) {
        case EventActionType.FETCH_EVENT:
        case EventActionType.SUCCESS_FETCH_EVENT_API:
        case EventActionType.FAIL_FETCH_EVENT_API:
        case EventActionType.ADD_EVENT:
        case EventActionType.SUCCESS_ADD_EVENT_API:
        case EventActionType.FAIL_ADD_EVENT_API:
            state.type = action.type
            state.items = action.items
            return Object.assign({}, state)
        default:
            // switch-case対象漏れバグ防止のneverを利用
            // 今回、action.typeの型は、リテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」である。
            // リテラルの場合に、このneverを利用すると、EventActionTypeで宣言したActionの中で
            // switch-caseの指定漏れがあると「never型にxxx型は指定できない」とコンパイルエラーが出て、チェックとして使える。
            const _: never = action.type;
            return state
    }
}

export default eventState