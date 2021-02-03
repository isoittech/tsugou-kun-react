import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react/types-6-0";

import { EventHistoryPC, EventHistoryPCProps } from "../../../main/components2/organism/EventHistory";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../../main/AppCss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CookiesProvider } from "react-cookie";

export default {
    title: "EventHistory",
    component: EventHistoryPC,
} as Meta;

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

const Template: Story<EventHistoryPCProps> = (args) => (
    <>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <EventHistoryPC {...args} />
                    </ThemeProvider>
                </BrowserRouter>
            </CookiesProvider>
        </ApolloProvider>
    </>
);

export const NoHistory = Template.bind({});
const eventHistories: { [key: string]: any }[] = [];
NoHistory.args = { eventHistories };

export const OneHistory = Template.bind({});
const eventHistories2: { [key: string]: any }[] = [];
eventHistories2.push({
    key: "schedule_update_id_1",
    value: { name: "one", scheduleUpdateId: "xxxxx", nichijis: ["one-1", "one-2"] },
});
OneHistory.args = { eventHistories: eventHistories2 };

export const TwoHistory = Template.bind({});
const eventHistories3: { [key: string]: any }[] = [];
eventHistories3.push({
    key: "schedule_update_id_1",
    value: { name: "one", scheduleUpdateId: "xxxxx", nichijis: ["one-1", "one-2"], memo: "oneone" },
});
eventHistories3.push({
    key: "schedule_update_id_2",
    value: { name: "two", scheduleUpdateId: "xxxxx", nichijis: ["two-1", "two-2"], memo: "twotwotwo" },
});
TwoHistory.args = { eventHistories: eventHistories3 };
