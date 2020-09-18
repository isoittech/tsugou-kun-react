import {createStore, applyMiddleware, Store, AnyAction} from 'redux'
import createSagaMiddleware, {SagaMiddleware} from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'
import rootSaga from './saga'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(
            sagaMiddleware
        ))
    );
    sagaMiddleware.run(rootSaga);
    return store;
};