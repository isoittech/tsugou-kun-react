import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
    Button,
    Typography,
    Paper,
    Grid,
    TextField,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { getToday } from "../../libs/common/datetime";
import { theme, useCommonStyles } from "../../AppCss";
import { CheckedBox, NichijiData, Sankasha } from "../../libs/common/declare";
import { logger } from "../../libs/common/logging";
import { MoyooshiDocument } from "../../generated/graphql";

export type EventNichijiTableRow = {
    eventNichiji: string;
    maru: number;
    sankaku: number;
    batsu: number;
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
                    <Box></Box>
                    <Box>
                        <form noValidate></form>
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
