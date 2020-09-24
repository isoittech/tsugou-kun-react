import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { App } from './App';
ReactDOM.render(React.createElement(Provider, { store: configureStore({}) },
    React.createElement(App, { foo: "aaaaa" })), document.getElementById('app'));
//# sourceMappingURL=main.js.map