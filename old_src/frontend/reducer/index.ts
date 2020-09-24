import { combineReducers, Reducer } from 'redux'
import eventState from '../reducer/event'

const reducer = combineReducers({ eventState })

export default reducer