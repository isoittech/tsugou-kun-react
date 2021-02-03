import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { ApiResultToast, ApiResultToastProps } from "../../../main/components2/molecules/ApiResultToast";
import { BrowserRouter } from "react-router-dom";

export default {
    title: "ApiResultToast",
    component: ApiResultToast,
} as Meta;

const Template: Story<ApiResultToastProps> = (args) => (
    <BrowserRouter>
        <ApiResultToast {...args} />
    </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
    schedule_update_id: "test",
};
