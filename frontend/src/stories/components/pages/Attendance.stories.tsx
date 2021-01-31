import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AttendancePC, AttendancePCProps } from "../../../main/components2/pages/Attendance";
import { Header } from "../../../main/components2/organism/Header";
import { Footer } from "../../../main/components2/organism/Footer";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../../../main/AppCss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { EventNichijiTableRow, SankashaTableRow } from "../../../main/libs/common/declare";
import { Sankasha, SankaKahiType } from "../../../main/generated/graphql";

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
    createEventNichijiTableRow("◯月✕1日△時□分", 0, 0, 0, 1),
    createEventNichijiTableRow("◯月✕2日△時□分", 0, 0, 0, 2),
    createEventNichijiTableRow("◯月✕3日△時□分", 0, 0, 0, 3),
    createEventNichijiTableRow("◯月✕4日△時□分", 0, 0, 0, 4),
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
    createEventNichijiTableRow("◯月✕1日△時□分", 1, 0, 0, 1),
    createEventNichijiTableRow("◯月✕2日△時□分", 1, 0, 0, 2),
    createEventNichijiTableRow("◯月✕3日△時□分", 0, 0, 1, 3),
    createEventNichijiTableRow("◯月✕4日△時□分", 0, 1, 0, 4),
];
const eventSankashaRows2: SankashaTableRow[] = [
    {
        name: "今夜が山田",
        comment: "コメントしますね",
        sankaNichijis: [
            { moyooshi_kouho_nichiji_id: 1, sanka_kahi: SankaKahiType.Maru },
            { moyooshi_kouho_nichiji_id: 2, sanka_kahi: SankaKahiType.Maru },
            { moyooshi_kouho_nichiji_id: 3, sanka_kahi: SankaKahiType.Batsu },
            { moyooshi_kouho_nichiji_id: 4, sanka_kahi: SankaKahiType.Sankaku },
        ],
    },
];

export const OnePerson = Template.bind({});
OnePerson.args = {
    eventName: "イベント名",
    eventMemo: "イベントメモメモメモメモメモメモ",
    eventNichijiRows: eventNichijiRows2,
    eventSankashaRows: eventSankashaRows2,
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
function createEventNichijiTableRow(
    eventNichiji: string,
    maru: number,
    sankaku: number,
    batsu: number,
    eventNichijiKouhoId: number
) {
    const ret: EventNichijiTableRow = {
        eventNichiji,
        maru,
        sankaku,
        batsu,
        eventNichijiKouhoId,
    };
    return ret;
}
