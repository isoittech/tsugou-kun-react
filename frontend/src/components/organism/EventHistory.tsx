import React from "react";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント履歴
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventHistory: React.FC<{ cookies?: any }> = ({ cookies }) => {
    const allCookies: { [key: string]: any } = cookies?.getAll();
    const eventHistories: { [key: string]: any }[] = [];
    if (allCookies && Object.keys(allCookies).length > 0) {
        Object.entries(allCookies).forEach(([key, value]) => {
            if (key.includes("schedule_update_id_")) eventHistories.push({ key, value });
        });
    }

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <div id="event_history" className="card shadow rounded">
                <div id="event_history_label" className="card-header">
                    最近このブラウザで閲覧したイベント
                </div>
                <div id="event_history_card_container" className="row d-flex justify-content-left pl-5 my-3">
                    {Object.keys(eventHistories).length > 0 ? (
                        eventHistories.map((cookie, idx) => (
                            <div key={idx} className="card shadow rounded col-3 my-1 mx-2 p-1">
                                <div className="card-header">
                                    <Link to={`/edit/${cookie.value.scheduleUpdateId}`}>{cookie.value.name}</Link>
                                </div>
                                <div className="card-body">
                                    {cookie.value.nichijis.map((nichiji, idx2) => (
                                        <div key={idx2} className="card m-1 p-1">
                                            {nichiji}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <>今のところありません</>
                    )}
                </div>
            </div>
        </>
    );
};

export default withCookies(EventHistory);
