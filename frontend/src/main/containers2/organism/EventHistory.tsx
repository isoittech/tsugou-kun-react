import React, { useCallback } from "react";
import { useCookies } from "react-cookie";
import { EventHistoryPC } from "../../components2/organism/EventHistory";
import { MoyooshiKouhoNichiji } from "../../generated/graphql";
import { EventInfo, EventInfoCookies } from "../../libs/common/declare";
import { logger } from "../../libs/common/logging";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント履歴
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export type EventHistoryProps = {};

export const EventHistory: React.FC<EventHistoryProps> = (args: EventHistoryProps) => {
    const [cookies, _] = useCookies(["moyooshi"]);
    // const eventHistories = cookies.value?.find((cookie) => cookie.key === "moyooshi");
    // tslint:disable-next-line: no-string-literal
    const eventHistories = cookies["moyooshi"];

    return <EventHistoryPC eventHistories={eventHistories}></EventHistoryPC>;
};

export const useMoyooshiCookie = () => {
    logger.info("[START]EventHistory.useMoyooshiCookie");
    const [cookies, setCookie] = useCookies(["moyooshi"]);
    const moyooshiCookies = cookies.moyooshi ?? ({} as EventInfoCookies);

    const updateMoyooshiCookie = useCallback(
        (
            scheduleUpdateIdForCookie: string,
            moyooshiName?: string,
            nichijiKouhos?: Pick<MoyooshiKouhoNichiji, "kouho_nichiji">[],
            moyooshiMemo?: string
        ) => {
            logger.info("[START]EventHistory.updateMoyooshiCookie");
            // ========================================================
            // Cookieへの設定値準備
            // ========================================================
            // -------------------------------------
            // 以前の情報を取得
            // -------------------------------------
            const eventInfoOld: EventInfo = moyooshiCookies[`schedule_update_id_${scheduleUpdateIdForCookie}`];

            // -------------------------------------
            // Cookie有効期限
            // -------------------------------------
            const expiredDate = new Date();
            expiredDate.setMinutes(expiredDate.getMinutes() + parseInt(process.env.COOKIE_EXPIRED_MINUTES, 10));

            // -------------------------------------
            // Cookieの内容設定
            // -------------------------------------
            let eventInfo: EventInfo = eventInfoOld;
            if (!eventInfo)
                eventInfo = {
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
            moyooshiCookies[`schedule_update_id_${scheduleUpdateIdForCookie}`] = eventInfo;
            // setCookie("moyooshi", moyooshiCookies, {
            //     path: "/",
            //     expires: expiredDate,
            // });
        },
        [moyooshiCookies]
    );

    return { updateMoyooshiCookie };
};
