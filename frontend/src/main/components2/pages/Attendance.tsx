import React, { useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
    Button,
    Typography,
    Paper,
    TextField,
    Box,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Collapse,
    Radio,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { Sankasha } from "../../libs/common/declare";
import { logger } from "../../libs/common/logging";
import { useRef } from "react";

export type EventNichijiTableRow = {
    eventNichiji: string;
    maru: number;
    sankaku: number;
    batsu: number;
    eventNichiziKouhoId: string;
};

export type AttendancePCProps = {
    eventName: string;
    eventMemo: string;
    eventNichijiRows: EventNichijiTableRow[];
    eventSankashaRows: Sankasha[];
};

export const AttendancePC: React.FC<AttendancePCProps> = (props: AttendancePCProps) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // スタイリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const classes = useStyles();

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 「参加可否を入力する」ボタン押下イベント関連
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const [opened, setOpend] = useState(false);

    // -------------------------------------
    // 自動スクロール
    // -------------------------------------
    // ref を作成しスクロールさせたい場所にある Element にセット
    const scrollRef = useRef();
    // このコールバックを呼び出して ref.current.scrollIntoView() を呼び出してスクロール
    // @ts-ignore: ts2325(scrollRefがundefinedかもしれない)
    const scrollToForm = (behavior = "smooth") => scrollRef.current.scrollIntoView({ behavior });

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 出欠用Radioフォーム関連
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Helmet>
                <title>イベント出欠記入 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>

            <main className={classes.layout}>
                <Paper className={classes.paper_contents} elevation={3}>
                    <Box>
                        <Typography variant="h4" align="center">
                            イベント出欠記入
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">{props.eventName}</Typography>
                    </Box>
                    <Box marginLeft={1} marginY={1}>
                        <Typography variant="caption">{props.eventMemo}</Typography>
                    </Box>
                    <Box marginY={2}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>日時</StyledTableCell>
                                        <StyledTableCell align="center">◯</StyledTableCell>
                                        <StyledTableCell align="center">△</StyledTableCell>
                                        <StyledTableCell align="center">✕</StyledTableCell>
                                        {props.eventSankashaRows.map((sankasha) => (
                                            <StyledTableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                                key={sankasha.name}
                                            >
                                                {sankasha.name}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.eventNichijiRows.map((row) => (
                                        <StyledTableRow key={row.eventNichiji}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.eventNichiji}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.maru}</StyledTableCell>
                                            <StyledTableCell align="center">{row.sankaku}</StyledTableCell>
                                            <StyledTableCell align="center">{row.batsu}</StyledTableCell>
                                            {props.eventSankashaRows.map((sankasha) => (
                                                <StyledTableCell
                                                    align="center"
                                                    component="th"
                                                    scope="row"
                                                    key={sankasha.name}
                                                >
                                                    {sankasha.getSankaKahi(row.eventNichiji)}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            コメント
                                        </StyledTableCell>
                                        <StyledTableCell colSpan={3} />
                                        {props.eventSankashaRows.map((sankasha) => (
                                            <StyledTableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                                key={sankasha.name}
                                            >
                                                {sankasha.comment}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* 「参加可否を入力する」ボタン押下時、ちょうどよい位置にスクロールするため、ここにdivを仕込む。 */}
                    <div ref={scrollRef} />
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                setOpend(!opened);
                                logger.debug("isOpening");
                            }}
                        >
                            参加可否を入力する
                        </Button>
                    </Box>

                    <Box marginTop={5}>
                        <Collapse
                            in={opened}
                            onExited={() => {
                                logger.debug("onExited.");
                            }}
                            onEntered={() => {
                                logger.debug("onEntered.");
                                scrollToForm();
                            }}
                        >
                            <Paper elevation={4}>
                                <Box padding={2}>
                                    <Box padding={2}>
                                        <TextField
                                            id="sankashaName"
                                            name="sankashaName"
                                            helperText="必須項目です。"
                                            required
                                            autoFocus
                                            label="お名前"
                                            variant="outlined"
                                            fullWidth
                                            // onChange={(e) => setsankashaName(e.target.value)}
                                            // InputLabelProps={{ shrink: sankashaName !== "" }}
                                            // inputRef={register}
                                        />
                                    </Box>
                                    <Box padding={2}>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>日時</StyledTableCell>
                                                        <StyledTableCell align="center">◯</StyledTableCell>
                                                        <StyledTableCell align="center">△</StyledTableCell>
                                                        <StyledTableCell align="center">✕</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {props.eventNichijiRows.map((row) => (
                                                        <StyledTableRow key={row.eventNichiji}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {row.eventNichiji}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Radio
                                                                    checked={selectedValue === "MARU"}
                                                                    onChange={handleChange}
                                                                    value="MARU"
                                                                    name={`event_nichizi_kouho_id_${row.eventNichiziKouhoId}`}
                                                                    inputProps={{ "aria-label": "◯" }}
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.sankaku}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.batsu}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Box padding={2}>
                                        <TextField
                                            id="sankashaComment"
                                            name="sankashaComment"
                                            helperText="任意項目です。コメント・言い訳・感謝、何でもどうぞ。"
                                            label="コメント"
                                            variant="outlined"
                                            fullWidth
                                            // onChange={(e) => setsankashaComment(e.target.value)}
                                            // InputLabelProps={{ shrink: sankashaComment !== "" }}
                                            // inputRef={register}
                                        />
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary" fullWidth>
                                            出欠を回答する
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Collapse>
                    </Box>
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
        [theme.breakpoints.up(920 + theme.spacing(2) * 2)]: {
            width: 920,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper_contents: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    paper_event: {
        backgroundColor: "#bbc2af",
    },
    table: {
        minWidth: 650,
    },
}));

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    })
)(TableRow);
