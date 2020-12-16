import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, CardContent, Button, Typography, Paper, Grid, TextField, Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";

import { getToday } from "../../libs/common/datetime";
import { useCommonStyles } from "../../AppCss";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    layout: {
        width: "auto",
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

export type TopProps = {};

export const Top: React.FC<TopProps> = () => {
    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // フォームの値・状態
    // -------------------------------------
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [eventName, setEventName] = useState("");
    const [eventNichijiKouho, setEventNichijiKouho] = useState("");
    const [eventMemo, setEventMemo] = useState("");

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
    // イベント日時候補テキストフィールドの値変化時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const onChangedOnNichijiKouho = (event) => {
        setEventNichijiKouho(event.target.value);
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 必須項目フォームの入力内容変化時に起動
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    useEffect(() => {
        const disabled = eventName === "" || eventNichijiKouho === "";
        setButtonDisabled(disabled);
    }, [eventName, eventNichijiKouho]);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 未分類
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const classes = useStyles();
    const commonClasses = useCommonStyles();
    const { register, handleSubmit } = useForm();
    const onSubmit = () => {
        console.log("onSubmit");
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Helmet>
                <title>イベント新規登録 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>

            <main className={classes.layout}>
                <Paper className={classes.paper} elevation={2}>
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
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <TextField
                                            id="eventMemo"
                                            label="イベント内容"
                                            helperText="このイベントについて告知したいことを書いてください。"
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => setEventMemo(e.target.value)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box marginTop={2}>
                                        <TextField
                                            id="eventMemo"
                                            label="イベント日時候補"
                                            helperText="必須項目です。開催日時の候補を1行ごとに書いてください。"
                                            value={eventNichijiKouho}
                                            required
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            fullWidth
                                            onChange={onChangedOnNichijiKouho}
                                            InputLabelProps={{ shrink: eventNichijiKouho !== "" }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        fullWidth
                                        disabled={buttonDisabled}
                                    >
                                        イベントを登録する
                                    </Button>
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
                        </Grid>
                    </form>
                </Paper>
            </main>
        </>
    );
};
