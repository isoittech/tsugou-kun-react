import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { EventName, EventNameProps } from "../../../main/components/molecules/EventName";

export default {
    title: "EventName",
    component: EventName,
} as Meta;

const Template: Story<EventNameProps> = (args) => <EventName {...args} />;

export const Mode1Default = Template.bind({});
Mode1Default.args = {};

export const Mode1ValueSet = Template.bind({});
Mode1ValueSet.args = {
    value: "サンプルイベント",
};

export const Mode2Default = Template.bind({});
Mode2Default.args = {
    displayMode: 2,
};

export const Mode2ValueSet = Template.bind({});
Mode2ValueSet.args = {
    value: "サンプルイベント",
    displayMode: 2,
};
