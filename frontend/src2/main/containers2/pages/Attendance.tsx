import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import { AttendancePC, AttendancePCProps } from "../../components2/pages/Attendance";
import {
    GetCalculatedSankanichijisDocument,
    GetSankashasDocument,
    SankaKahiInput,
    SankaKahiType,
    useAddSankashaMutation,
    useGetCalculatedSankanichijisQuery,
    useGetSankashasQuery,
    useMoyooshiQuery,
} from "../../generated/graphql";
import {
    EventNichijiTableRow,
    PickedSankaNichiji,
    SankashaCookie,
    SankashaCookies,
    SankashaTableRow,
} from "../../libs/common/declare";
import { logger } from "../../libs/common/logging";
import { useMoyooshiCookie } from "../organism/EventHistory";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// 出欠回答ページ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export const Attendance: React.FC = () => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // パラメータ
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { key } = useParams();
    const paramScheduleUpdateId = key;

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Cookie
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { updateMoyooshiCookie } = useMoyooshiCookie();
    const { updateSankashaCookie } = useSankashaCookie();
    const [cookies, _] = useCookies(["sankasha"]);
    // tslint:disable-next-line: no-string-literal
    const sankashaCookies = cookies["sankasha"];
    const sankashaCookie = sankashaCookies ? sankashaCookies[`schedule_update_id_${paramScheduleUpdateId}`] : undefined;

    const sankashaIdFrCookie = sankashaCookie?.sankashaId;
    const sankashaNameFrCookie = sankashaCookie?.sankashaName;
    const sankashaCommentFrCookie = sankashaCookie?.sankashaComment;

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // コンポーネントのState
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // フォームの値・状態
    // ========================================================
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [sankashaName, setSankashaName] = useState(sankashaNameFrCookie);
    const [sankashaComment, setSankashaComment] = useState(sankashaCommentFrCookie);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 必須項目フォームの入力内容変化時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        const disabled = sankashaName === "";
        setButtonDisabled(disabled);
    }, [sankashaName]);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Submit押下イベントハンドリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const [addSankashaMutation, { data, loading, error }] = useAddSankashaMutation({
        onCompleted: (dataOnCompleted: any) => {
            logger.debug(`dataOnCompleted: ${JSON.stringify(dataOnCompleted)}`);
            // -------------------------------------
            // Mutation完了後にCookie更新（参加者ID等）
            // -------------------------------------
            updateSankashaCookie(
                paramScheduleUpdateId,
                dataOnCompleted.addSankasha.id,
                dataOnCompleted.addSankasha.name,
                dataOnCompleted.addSankasha.comment
            );
            // -------------------------------------
            // Mutation完了後にCookie更新（過去閲覧イベント）
            // -------------------------------------
            updateMoyooshiCookie(paramScheduleUpdateId);
        },
        refetchQueries: [
            {
                query: GetSankashasDocument,
                variables: {
                    schedule_update_id: paramScheduleUpdateId,
                },
            },
            {
                query: GetCalculatedSankanichijisDocument,
                variables: {
                    schedule_update_id: paramScheduleUpdateId,
                },
            },
        ],
    });
    const onSubmit = async (submitArgs, e) => {
        e.preventDefault();

        const argSankashaName = submitArgs.sankashaName;
        const argSankashaComment = submitArgs.sankashaComment;
        const sankashaId = sankashaIdFrCookie;

        const sankaKahis: SankaKahiInput[] = [];
        Object.keys(submitArgs)
            .filter((argKey) => argKey.includes("event_nichizi_kouho_id_"))
            .forEach((argKey) => {
                sankaKahis.push({
                    sankaKahi: submitArgs[argKey],
                    moyooshiNichijiKouhoId: Number(argKey.replace("event_nichizi_kouho_id_", "")),
                });
            });

        logger.debug("[start]: addSankashaMutation");
        await addSankashaMutation({
            variables: {
                addedSankasha: {
                    name: argSankashaName,
                    comment: argSankashaComment,
                    schedule_update_id: paramScheduleUpdateId,
                    sankaKahis,
                    sankashaId,
                },
            },
        });
        logger.debug("[end]: addSankashaMutation");

        e.target.reset();
    };
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // データの読み込み With GraphQL
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // -------------------------------------
    // イベント
    // -------------------------------------
    const { data: eventData, loading: eventLoading, error: eventLoadingError } = useMoyooshiQuery({
        variables: {
            schedule_update_id: paramScheduleUpdateId,
        },
    });
    // logger.debug("eventData:", eventData);

    // -------------------------------------
    // 参加者一覧
    // -------------------------------------
    const { data: sankashasData, loading: sankashasLoading, error: sankashasLoadingError } = useGetSankashasQuery({
        variables: {
            schedule_update_id: paramScheduleUpdateId,
        },
    });
    // logger.debug("sankashasData:", sankashasData);

    // -------------------------------------
    // 参加日時一覧
    // -------------------------------------
    const {
        data: sankanichijisData,
        loading: sankanichijisLoading,
        error: sankanichijisLoadingError,
    } = useGetCalculatedSankanichijisQuery({
        variables: {
            schedule_update_id: paramScheduleUpdateId,
        },
    });
    // logger.debug("sankanichijisData:", sankanichijisData);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング用データ作成
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // -------------------------------------
    // イベント候補日時テーブルID・候補日時表記マッピング
    // -------------------------------------
    const idDispMap: { [mapKey: string]: string } = {};
    if (sankanichijisData) {
        sankanichijisData.getCalculatedSankanichijis.forEach((calculatedSankaNichiji) => {
            idDispMap[calculatedSankaNichiji.moyooshiKouhoNichiji.id] =
                calculatedSankaNichiji.moyooshiKouhoNichiji.kouho_nichiji;
        });
    }

    // -------------------------------------
    // 参加者データ
    // -------------------------------------
    const eventSankashaRows: SankashaTableRow[] = [];
    if (sankashasData) {
        sankashasData.getSankashas.forEach((sankasha) => {
            const sankaNichijis: PickedSankaNichiji[] = [];
            sankasha.sankaNichiji.forEach((sankaNichijiData) => {
                sankaNichijis.push({
                    moyooshi_kouho_nichiji_id: sankaNichijiData.moyooshi_kouho_nichiji_id,
                    sanka_kahi: sankaNichijiData.sanka_kahi,
                });
            });
            eventSankashaRows.push({
                name: sankasha.name,
                comment: sankasha.comment,
                sankaNichijis,
            } as SankashaTableRow);
        });
    }

    // -------------------------------------
    // 候補日時データ
    // -------------------------------------
    const eventNichijiRows: EventNichijiTableRow[] = [];
    if (sankanichijisData) {
        sankanichijisData.getCalculatedSankanichijis.forEach((calculatedSankanichiji) => {
            const nichijiStr = calculatedSankanichiji.moyooshiKouhoNichiji.kouho_nichiji;
            const maruCount = calculatedSankanichiji.maruCount;
            const sankakuCount = calculatedSankanichiji.sankakuCount;
            const batsuCount = calculatedSankanichiji.batsuCount;
            const kouhoNichijiId = calculatedSankanichiji.moyooshiKouhoNichiji.id;
            eventNichijiRows.push(
                createEventNichijiTableRow(nichijiStr, maruCount, sankakuCount, batsuCount, kouhoNichijiId)
            );
        });
    }

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // -------------------------------------
    // ローディング表示判定
    // -------------------------------------
    const isLoading = eventLoading || sankashasLoading || sankanichijisLoading;

    // -------------------------------------
    // エラー表示判定
    // -------------------------------------
    const isError = !eventData || eventNichijiRows.length === 0;

    // -------------------------------------
    // レンダリング
    // -------------------------------------
    const args: AttendancePCProps = {
        eventName: eventData?.Moyooshi.name,
        eventMemo: eventData?.Moyooshi.memo,
        sankashaName,
        sankashaComment,
        buttonDisabled,
        eventNichijiRows,
        eventSankashaRows,
        isLoading,
        isError,
        onSubmit,
        setSankashaName,
        setSankashaComment,
    };

    return <AttendancePC {...args}></AttendancePC>;
};

const createEventNichijiTableRow = (
    eventNichiji: string,
    maru: number,
    sankaku: number,
    batsu: number,
    eventNichijiKouhoId: number
) => {
    const ret: EventNichijiTableRow = {
        eventNichiji,
        maru,
        sankaku,
        batsu,
        eventNichijiKouhoId,
    };
    return ret;
};

export const getSankaKahi = (moyooshiKouhoNichijiId: number, sankaNichijis: PickedSankaNichiji[]): string => {
    let result: string = "-";

    for (const sankaNichiji of sankaNichijis) {
        if (sankaNichiji.moyooshi_kouho_nichiji_id !== moyooshiKouhoNichijiId) continue;

        if (sankaNichiji.sanka_kahi === SankaKahiType.Maru) result = "◯";
        else if (sankaNichiji.sanka_kahi === SankaKahiType.Sankaku) result = "△";
        else if (sankaNichiji.sanka_kahi === SankaKahiType.Batsu) result = "✕";
        else result = "-";
    }
    return result;
};

export const useSankashaCookie = () => {
    const [cookies, setCookie] = useCookies(["sankasha"]);

    const updateSankashaCookie = (
        scheduleUpdateIdForCookie: string,
        sankashaId: number,
        sankashaName: string,
        sankashaComment: string
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
        const sankashaUpdatedCookie: SankashaCookie = {
            sankashaId,
            sankashaName,
            sankashaComment,
        };

        // ========================================================
        // Cookieへの設定
        // ========================================================
        const sankashaCookies = cookies.sankasha ?? ({} as SankashaCookies);
        sankashaCookies[`schedule_update_id_${scheduleUpdateIdForCookie}`] = sankashaUpdatedCookie;

        setCookie("sankasha", sankashaCookies, {
            path: "/",
            expires: expiredDate,
        });
    };

    return { updateSankashaCookie };
};
