import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";

import "./app.css";
import setupStore from "./store";
import { theme } from "./AppCss";

const client = new ApolloClient({
    uri: `${process.env.HOST_URL}/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <Provider store={setupStore()}>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </CookiesProvider>
        </ApolloProvider>
    </Provider>,
    document.getElementById("app")
);
