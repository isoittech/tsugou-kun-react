import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, makeStyles, Paper, Typography } from "@material-ui/core";
import { EventInfoCookies } from "../../libs/common/declare";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント履歴
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

export type EventHistoryPCProps = { eventHistories: EventInfoCookies };

export const EventHistoryPC: React.FC<EventHistoryPCProps> = (args: EventHistoryPCProps) => {
    const eventHistories = args.eventHistories;

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // スタイリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const classes = useStyles();

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 部品
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    let eventHistoryPapers;
    if (eventHistories && Object.keys(eventHistories).length > 0) {
        eventHistoryPapers = Object.entries(eventHistories).map(([key, eventInfo]) => {
            return (
                <Paper className={classes.paper_frame_one_event} elevation={3} key={key}>
                    <Link
                        to={`/attendance/${key.replace("schedule_update_id_", "")}`}
                        className={classes.event_name_link}
                    >
                        <Typography variant="h6" className={classes.event_name}>
                            {eventInfo.name}
                        </Typography>
                    </Link>
                    <Typography variant="caption" className={classes.event_memo}>
                        {eventInfo.memo}
                    </Typography>
                    {eventInfo.nichijis.map((nichiji, idx2) => (
                        <Paper className={classes.paper_frame_one_nichiji} elevation={3} key={idx2}>
                            {nichiji}
                        </Paper>
                    ))}
                </Paper>
            );
        });
    } else {
        eventHistoryPapers = (
            <Typography className={classes.no_cookie_msg} component="h6">
                今のところありません
            </Typography>
        );
    }

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <Container maxWidth={false} disableGutters className={classes.layout}>
            <Paper className={classes.paper_frame} elevation={3}>
                <Box>
                    <Typography component="h1" variant="h4" align="center">
                        最近このブラウザで閲覧したイベント
                    </Typography>
                </Box>
                <Box>{eventHistoryPapers}</Box>
            </Paper>
        </Container>
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
    paper_frame: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    paper_frame_one_event: {
        display: "inline-block",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    paper_frame_one_nichiji: {
        display: "inline-block",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    no_cookie_msg: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    event_name: {
        color: theme.palette.primary.main,
    },
    event_name_link: {
        "& a:hover": {
            textDecoration: "underline!important" as any,
            color: theme.palette.secondary.main,
        },
    },
    event_memo: {
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1),
        display: "block",
    },
}));
