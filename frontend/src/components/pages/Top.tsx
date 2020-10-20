import React from "react";
import { Helmet } from "react-helmet";

import { EventAddCard } from "../organism/EventAddCard";

export const Top: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>イベント新規登録 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>
            <div className=" row d-flex justify-content-center my-5">
                <div className="col-sm-10">
                    <EventAddCard />
                </div>
            </div>
        </>
    );
};
