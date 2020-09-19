import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import {App} from './App'
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <Provider store={configureStore({})}>
        <BrowserRouter>
            <App foo="aaaaa"/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
)

