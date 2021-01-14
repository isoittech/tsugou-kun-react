import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Container, makeStyles, Paper, Typography } from "@material-ui/core";
import { MoyooshiKouhoNichiji } from "../../generated/graphql";
import { EventInfo } from "../../libs/common/declare";
import { EventHistoryPC } from "../../components2/organism/EventHistory";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント履歴
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export type EventHistoryProps = {};

export const EventHistory: React.FC<EventHistoryProps> = (args: EventHistoryProps) => {
    const [cookies, setCookie] = useCookies(["moyooshi"]);
    const eventHistories: { [key: string]: any }[] = [];
    if (cookies && Object.keys(cookies).length > 0) {
        Object.entries(cookies).forEach(([key, value]) => {
            if (key.includes("schedule_update_id_")) eventHistories.push({ key, value });
        });
    }

    return <EventHistoryPC eventHistories={eventHistories}></EventHistoryPC>;
};

export const useMoyooshiCookie = () => {
    const [cookies, setCookie] = useCookies(["moyooshi"]);

    const updateMoyooshiCookie = (
        scheduleUpdateIdForCookie: string,
        moyooshiName: string,
        nichijiKouhos: Pick<MoyooshiKouhoNichiji, "kouho_nichiji">[],
        moyooshiMemo?: string
    ) => {
        // ========================================================
        // Cookieへの設定値準備
        // ========================================================
        // -------------------------------------
        // Cookie有効期限
        // -------------------------------------
        const expiredDate = new Date();
        expiredDate.setMinutes(expiredDate.getMinutes() + parseInt(process.env.COOKIE_EXPIRED_MINUTES, 10));

        // -------------------------------------
        // Cookieの内容設定
        // -------------------------------------
        const eventInfo: EventInfo = {
            name: moyooshiName,
            scheduleUpdateId: scheduleUpdateIdForCookie,
            nichijis: nichijiKouhos.map((kouho) => kouho.kouho_nichiji),
        };

        if (moyooshiMemo) {
            let memo = moyooshiMemo;
            if (memo.length > 18) memo = memo.substring(0, 19) + "...";
            eventInfo.memo = memo;
        }

        // ========================================================
        // Cookieへの設定
        // ========================================================
        setCookie(`schedule_update_id_${scheduleUpdateIdForCookie}`, eventInfo, {
            path: "/",
            expires: expiredDate,
        });
    };

    return { updateMoyooshiCookie };
};
