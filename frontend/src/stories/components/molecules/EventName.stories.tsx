import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { EventName, EventNameProps } from "../../../components/molecules/EventName";

export default {
    title: "EventName",
    component: EventName,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as Meta;

const Template: Story<EventNameProps> = (args) => <EventName {...args} />;

export const Default = Template.bind({});
Default.args = {
};
