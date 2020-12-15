import React from "react";
import { Helmet } from "react-helmet";

// import { EventEditCard } from "../../containers/organism/EventEditCard";
import EventCard from "../../containers/organism/EventCard";

export const Edit: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>イベント編集 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>
            <div className=" row d-flex justify-content-center my-5">
                <div className="col-sm-10">
                    <EventCard />
                </div>
            </div>
        </>
    );
};
