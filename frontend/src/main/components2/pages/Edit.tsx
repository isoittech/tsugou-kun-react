import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Paper, Grid, TextField, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { getToday } from "../../libs/common/datetime";
import { useCommonStyles } from "../../AppCss";
import { useAddMoyooshiMutation } from "../../features/moyooshi/moyooshi-graphql";
import { ApiResultToast } from "../molecules/ApiResultToast";

export type EditProps = {};

export const Edit: React.FC<EditProps> = () => {
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
    // その他Hooks
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { register, handleSubmit } = useForm();
    const [addMoyooshiMutation, { data, loading, error }] = useAddMoyooshiMutation();

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // Submit押下イベントハンドリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // ========================================================
    // API実行
    // ========================================================
    const onSubmit = async (
        { eventName: argEventName, eventMemo: argEventMemo, eventNichijiKouho: argEventNichijiKouho },
        e
    ) => {
        await addMoyooshiMutation({
            variables: {
                moyooshi: { name: argEventName, memo: argEventMemo, moyooshiKouhoNichijis: argEventNichijiKouho },
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
        const disabled = eventName === "" || eventNichijiKouho === "";
        setButtonDisabled(disabled);
    }, [eventName, eventNichijiKouho]);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Helmet>
                <title>イベント編集 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>

            <main className={classes.layout}>
                {noticeTag}
                <Paper className={classes.paper} elevation={3}>
                    <Typography component="h1" variant="h4" align="center">
                        イベント情報編集
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <Box marginTop={2}>
                                    <Typography component="h1" variant="h6" align="left">
                                        イベント名
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Box marginTop={2}>
                                    <TextField
                                        id="eventName"
                                        name="eventName"
                                        helperText="必須項目です。"
                                        required
                                        autoFocus
                                        autoComplete="given-name"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEventName(e.target.value)}
                                        inputRef={register}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box marginTop={2}>
                                    <Typography component="h1" variant="h6" align="left">
                                        イベント内容
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Box marginTop={2}>
                                    <TextField
                                        id="eventMemo"
                                        name="eventMemo"
                                        helperText="このイベントについて告知したいことを書いてください。"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEventMemo(e.target.value)}
                                        inputRef={register}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box marginTop={2}>
                                    <Typography component="h1" variant="h6" align="left">
                                        イベント日時削除
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Box marginTop={2}>
                                    <TextField
                                        id="eventMemo"
                                        name="eventMemo"
                                        helperText="削除したい日時をチェックしてください。"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEventMemo(e.target.value)}
                                        inputRef={register}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box marginTop={2}>
                                    <Typography component="h1" variant="h6" align="left">
                                        イベント日時候補
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box marginTop={2}>
                                    <TextField
                                        id="eventNichijiKouho"
                                        name="eventNichijiKouho"
                                        helperText="開催日時の候補を1行ごとに書いてください。"
                                        value={eventNichijiKouho}
                                        multiline
                                        rows={10}
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => setEventNichijiKouho(e.target.value)}
                                        inputRef={register}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Box marginTop={2}>
                                    <Calendar
                                        value={selectedDay}
                                        onChange={(newValue: DayValue) => {
                                            onCalendarClick(newValue);
                                            setSelectedDay(newValue);
                                        }}
                                        shouldHighlightWeekends
                                        minimumDate={getToday()}
                                        calendarClassName="custom-calendar-in-edit"
                                    />
                                    <Typography
                                        className={commonClasses.helperText}
                                        style={{ marginLeft: "1.2em", marginTop: "0.5em" }}
                                    >
                                        クリックして日時候補を入力できます。
                                    </Typography>
                                </Box>
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
                                    イベント情報を修正する
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
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(920 + theme.spacing(2) * 2)]: {
            width: 920,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
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
