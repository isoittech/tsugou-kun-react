import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Paper, Grid, TextField, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { getToday } from "../../libs/common/datetime";
import { useCommonStyles } from "../../AppCss";
import { useAddMoyooshiMutation } from "../../features2/moyooshi/moyooshi-graphql";
import { ApiResultToast } from "../molecules/ApiResultToast";
import { useMoyooshiCookie } from "../../containers2/organism/EventHistory";
import { logger } from "../../libs/common/logging";
import { useCookies } from "react-cookie";
import { EventInfo, EventInfoCookies } from "../../libs/common/declare";

export type TopProps = {};

export const Top: React.FC<TopProps> = () => {
    logger.info("[START]Top");
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // スタイリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const classes = useStyles();
    const commonClasses = useCommonStyles();

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // コンポーネントのState
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // フォームの値・状態
    // ========================================================
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Cookie
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const [cookies, setCookie] = useCookies(["moyooshi"]);
    const moyooshiCookies = cookies.moyooshi ?? ({} as EventInfoCookies);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // その他Hooks
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { register, handleSubmit } = useForm();

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Submit押下イベントハンドリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // API実行
    // ========================================================
    const [addMoyooshiMutation, { data, loading, error }] = useAddMoyooshiMutation({
        onCompleted: (dataOnCompleted: any) => {
            // ========================================================
            // Cookie更新準備
            // ========================================================
            // -------------------------------------
            // 設定用情報準備
            // -------------------------------------
            const moyooshiName = dataOnCompleted.addMoyooshi.name;
            const scheduleUpdateIdForCookie = dataOnCompleted.addMoyooshi.schedule_update_id;
            const nichijiKouhos = dataOnCompleted.addMoyooshi.moyooshiKouhoNichijis;
            const moyooshiMemo = dataOnCompleted.addMoyooshi.memo;
            // -------------------------------------
            // 更新関数実行
            // -------------------------------------
            // updateMoyooshiCookie(scheduleUpdateIdForCookie, moyooshiName, nichijiKouhos, moyooshiMemo);

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
            // ※過去設定されたものがある場合は、新しい値で上書きする。
            // -------------------------------------
            let eventInfo: EventInfo;
            if (eventInfoOld)
                eventInfo = {
                    name: eventInfoOld.name,
                    memo: eventInfoOld.memo,
                    scheduleUpdateId: eventInfoOld.scheduleUpdateId,
                    nichijis: eventInfoOld.nichijis,
                };
            else
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
            setCookie("moyooshi", moyooshiCookies, {
                path: "/",
                expires: expiredDate,
            });
        },
    });
    const onSubmit = async (
        { eventName: argEventName, eventMemo: argEventMemo, eventNichijiKouho: argEventNichijiKouho },
        e
    ) => {
        logger.info("[START]Top.onSubmit");

        // -------------------------------------
        // イベント日時候補テキストエリアの内容を改行コードで分割
        // -------------------------------------
        const eventNichijiKouhoArray: string[] = argEventNichijiKouho.split("\n");

        await addMoyooshiMutation({
            variables: {
                moyooshi: { name: argEventName, memo: argEventMemo, moyooshiKouhoNichijis: eventNichijiKouhoArray },
            },
        });

        e.target.reset();
        setEventName("");
        setEventMemo("");
        setEventNichijiKouho("");
    };
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Submit押下結果イベントハンドリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { updateMoyooshiCookie } = useMoyooshiCookie();
    let noticeTag;
    if (loading) {
        // ========================================================
        // API実行中
        // ========================================================
        noticeTag = <div>Now Loading...</div>;
    } else if (error) {
        noticeTag = <div>error....</div>;
        // ========================================================
        // API実行失敗時
        // ========================================================
    } else if (data) {
        // ========================================================
        // API実行成功時
        // ========================================================
        // noticeTag = <div>{data.addMoyooshi.name}</div>;
        noticeTag = <ApiResultToast schedule_update_id={data.addMoyooshi.schedule_update_id}></ApiResultToast>;
    }

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // カレンダーがクリックされた時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onCalendarClick = (dateAtClicked: DayValue) => {
        const { year, month, day } = dateAtClicked;

        let printedDate = null;
        if (eventNichijiKouho) printedDate = `${eventNichijiKouho}\n${year}/${month}/${day} 19:00～`;
        else printedDate = `${year}/${month}/${day} 19:00～`;

        setEventNichijiKouho(printedDate);
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 必須項目フォームの入力内容変化時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        logger.info("[START]Top.useEffect[eventName, eventNichijiKouho]");

        const disabled = eventName === "" || eventNichijiKouho === "";
        setButtonDisabled(disabled);
    }, [eventName, eventNichijiKouho]);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    logger.info("[START]Top.render");
    return (
        <>
            <Helmet>
                <title>イベント新規登録 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>

            <main className={classes.layout}>
                {noticeTag}
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h4" align="center">
                        さぁ催しましょう
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <TextField
                                            id="eventName"
                                            name="eventName"
                                            helperText="必須項目です。"
                                            required
                                            autoFocus
                                            label="イベント名"
                                            autoComplete="given-name"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => setEventName(e.target.value)}
                                            InputLabelProps={{ shrink: eventName !== "" }}
                                            inputRef={register}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <TextField
                                            id="eventMemo"
                                            name="eventMemo"
                                            label="イベント内容"
                                            helperText="このイベントについて告知したいことを書いてください。"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => setEventMemo(e.target.value)}
                                            InputLabelProps={{ shrink: eventMemo !== "" }}
                                            inputRef={register}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <TextField
                                            id="eventNichijiKouho"
                                            name="eventNichijiKouho"
                                            label="イベント日時候補"
                                            helperText="必須項目です。開催日時の候補を1行ごとに書いてください。"
                                            value={eventNichijiKouho}
                                            required
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => setEventNichijiKouho(e.target.value)}
                                            InputLabelProps={{ shrink: eventNichijiKouho !== "" }}
                                            inputRef={register}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <Calendar
                                            value={selectedDay}
                                            onChange={(newValue: DayValue) => {
                                                onCalendarClick(newValue);
                                                setSelectedDay(newValue);
                                            }}
                                            shouldHighlightWeekends
                                            minimumDate={getToday()}
                                            calendarClassName="custom-calendar"
                                        />
                                        <Typography
                                            className={commonClasses.helperText}
                                            style={{ marginLeft: "1.2em", marginTop: "0.5em" }}
                                        >
                                            クリックして日時候補を入力できます。
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    fullWidth
                                    disabled={buttonDisabled}
                                    type="submit"
                                >
                                    イベントを登録する
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </main>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        width: "auto",
        marginTop: "100px",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(820 + theme.spacing(2) * 2)]: {
            width: 820,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));
