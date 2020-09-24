import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import rootSaga from './saga';
export default function configureStore(initialState) {
    var sagaMiddleware = createSagaMiddleware();
    var store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
}
;
//# sourceMappingURL=store.js.map