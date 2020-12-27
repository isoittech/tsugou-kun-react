import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Top, TopProps } from "../../../main/components2/pages/Top";
import { Header } from "../../../main/components2/organism/Header";
import { Footer } from "../../../main/components2/organism/Footer";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../../../main/AppCss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default {
    title: "Top",
    component: Top,
} as Meta;

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

const Template: Story<TopProps> = (args) => (
    <>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header></Header>
                    <div className="container">
                        <Top {...args} />
                    </div>
                    <Footer></Footer>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </>
);

export const Mode1Default = Template.bind({});
Mode1Default.args = {};
