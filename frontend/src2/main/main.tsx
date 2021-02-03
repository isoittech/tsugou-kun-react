import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./app.css";
import { theme } from "./AppCss";

const client = new ApolloClient({
    uri: `${process.env.HOST_URL}/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <CookiesProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </CookiesProvider>
    </ApolloProvider>,
    document.getElementById("app")
);
