import {EventAction, FETCH_EVENT, SUCCESS_FETCH_EVENT_API, FAIL_FETCH_EVENT_API} from '../action/event'


export type EventState = {
    type: String,
    items: any[]
}


const eventState = (state: EventState = {type: '', items: []}, action: EventAction) => {
    switch (action.type) {
        case FETCH_EVENT:
        case SUCCESS_FETCH_EVENT_API:
        case FAIL_FETCH_EVENT_API:
            state.type = action.type
            state.items = action.items
            return Object.assign({}, state)
        default:
            return state
    }
}

export default eventState