import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import setupStore from "./store";

ReactDOM.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
