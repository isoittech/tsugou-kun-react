import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store';
import { App } from './App'

ReactDOM.render(
    <Provider store={configureStore({})}>
        <App foo="aaaaa"/>
    </Provider>,
    document.getElementById('app')
)

