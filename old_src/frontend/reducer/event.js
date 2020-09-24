import { FETCH_EVENT, SUCCESS_FETCH_EVENT_API, FAIL_FETCH_EVENT_API } from '../action/event';
var eventState = function (state, action) {
    if (state === void 0) { state = { type: '', items: [] }; }
    switch (action.type) {
        case FETCH_EVENT:
        case SUCCESS_FETCH_EVENT_API:
        case FAIL_FETCH_EVENT_API:
            state.type = action.type;
            state.items = action.items;
            return Object.assign({}, state);
        default:
            return state;
    }
};
export default eventState;
//# sourceMappingURL=event.js.map