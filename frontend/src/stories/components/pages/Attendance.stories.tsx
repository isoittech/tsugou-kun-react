import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AttendancePC, AttendancePCProps, EventNichijiTableRow } from "../../../main/components2/pages/Attendance";
import { Header } from "../../../main/components2/organism/Header";
import { Footer } from "../../../main/components2/organism/Footer";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../../../main/AppCss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SankaKahiType, Sankasha } from "../../../main/libs/common/declare";

export default {
    title: "AttendancePC",
    component: AttendancePC,
} as Meta;

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

const Template: Story<AttendancePCProps> = (args) => (
    <>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header></Header>
                    <div className="container">
                        <AttendancePC {...args} />
                    </div>
                    <Footer></Footer>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    </>
);
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const Default = Template.bind({});
const eventNichijiRows1 = [
    createEventNichijiTableRow("◯月✕1日△時□分", 0, 0, 0),
    createEventNichijiTableRow("◯月✕2日△時□分", 0, 0, 0),
    createEventNichijiTableRow("◯月✕3日△時□分", 0, 0, 0),
    createEventNichijiTableRow("◯月✕4日△時□分", 0, 0, 0),
];
const eventSankashaRows1: Sankasha[] = [];
Default.args = {
    eventName: "イベント名",
    eventMemo: "イベントメモメモメモメモメモメモ",
    eventNichijiRows: eventNichijiRows1,
    eventSankashaRows: eventSankashaRows1,
};
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
const eventNichijiRows2 = [
    createEventNichijiTableRow("◯月✕1日△時□分", 1, 0, 0),
    createEventNichijiTableRow("◯月✕2日△時□分", 1, 0, 0),
    createEventNichijiTableRow("◯月✕3日△時□分", 0, 0, 1),
    createEventNichijiTableRow("◯月✕4日△時□分", 0, 1, 0),
];
const eventSankashaRows2: Sankasha[] = [
    new Sankasha("今夜が山田", "コメントしますね", [
        { nichiji: "◯月✕1日△時□分", sankaKahi: SankaKahiType.MARU },
        { nichiji: "◯月✕2日△時□分", sankaKahi: SankaKahiType.MARU },
        { nichiji: "◯月✕3日△時□分", sankaKahi: SankaKahiType.BATSU },
        { nichiji: "◯月✕4日△時□分", sankaKahi: SankaKahiType.SANKAKU },
    ]),
];

export const OnePerson = Template.bind({});
OnePerson.args = {
    eventName: "イベント名",
    eventMemo: "イベントメモメモメモメモメモメモ",
    eventNichijiRows: eventNichijiRows2,
    eventSankashaRows: eventSankashaRows2,
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
function createEventNichijiTableRow(eventNichiji: string, maru: number, sankaku: number, batsu: number) {
    const ret: EventNichijiTableRow = {
        eventNichiji,
        maru,
        sankaku,
        batsu,
    };
    return ret;
}
