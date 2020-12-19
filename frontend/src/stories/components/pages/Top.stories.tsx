import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Top, TopProps } from "../../../main/components2/pages/Top";
import { Header } from "../../../main/components2/organism/Header";
import { Footer } from "../../../main/components2/organism/Footer";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../../../main/AppCss";

export default {
    title: "Top",
    component: Top,
} as Meta;

const Template: Story<TopProps> = (args) => (
    <>
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
    </>
);

export const Mode1Default = Template.bind({});
Mode1Default.args = {};
