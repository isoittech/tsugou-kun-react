import {
    Box,
    Button,
    CircularProgress,
    Collapse,
    Paper,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { ChangeEvent, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { getSankaKahi } from "../../containers2/pages/Attendance";
import { SankaKahiType } from "../../generated/graphql";
import { EventNichijiTableRow, SankashaTableRow } from "../../libs/common/declare";

export type AttendancePCProps = {
    eventName: string;
    eventMemo: string;
    sankashaName?: string;
    sankashaComment?: string;
    eventNichijiRows: EventNichijiTableRow[];
    eventSankashaRows: SankashaTableRow[];
    buttonDisabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    onSubmit: (submitArgs: any, event) => Promise<void>;
    setSankashaName: (value: string) => void;
    setSankashaComment: (value: string) => void;
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
    // フォーム関連
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    const { register, handleSubmit } = useForm();

    // -------------------------------------
    // 出欠用Radioフォーム関連
    // -------------------------------------
    // flag
    const [updateFlg, setUpdateFlg] = useState("");

    // 辞書オブジェクト
    const sankaKahiValues: { [name: string]: SankaKahiType | undefined } = {};
    props.eventNichijiRows?.map((value) => {
        sankaKahiValues[`event_nichizi_kouho_id_${value.eventNichijiKouhoId}`] = undefined;
    });
    const [sankaKahiValuesState, setSankaKahiValues] = useState(sankaKahiValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, eventNichijiKouhoId: number) => {
        const key = `event_nichizi_kouho_id_${eventNichijiKouhoId}`;
        let value;
        if (event.target.value === SankaKahiType.Maru) {
            value = SankaKahiType.Maru;
        } else if (event.target.value === SankaKahiType.Sankaku) {
            value = SankaKahiType.Sankaku;
        } else if (event.target.value === SankaKahiType.Batsu) {
            value = SankaKahiType.Batsu;
        } else {
            throw new Error("想定外の種別:" + event.target.value);
        }

        // setSankaKahiValues((prevSankaKahiValues) => {
        //     ...prevSankaKahiValues,
        //     key: value
        // });

        // 本当は上記のようにスプレッド演算子を使って書きたい。
        // が、辞書型オブジェクトはスプレッド演算子が使えないっぽいので、
        // 下記のようにする。※フラグ用のstateを使う…。
        setSankaKahiValues((prevSankaKahiValues) => {
            prevSankaKahiValues[key] = value;
            return prevSankaKahiValues;
        });
        setUpdateFlg(moment().format()); // Reactにリロードを依頼するための処理
    };

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // 送信用データ関連
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // -------------------------------------
    // 参加可否回答用Radioボタン
    // -------------------------------------

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダリング
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Helmet>
                <title>イベント参加状況・出欠記入 - 都合くん「この日空いてるっすか。」</title>
            </Helmet>

            <main className={classes.layout}>
                {props.isError && <Box textAlign="center">Oh, error.... you unlucky.</Box>}

                {!props.isError && !props.isLoading && (
                    <Paper className={classes.paper_contents} elevation={3}>
                        <Box>
                            <Typography variant="h4" align="center">
                                イベント参加状況
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
                                                        {getSankaKahi(row.eventNichijiKouhoId, sankasha.sankaNichijis)}
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
                                }}
                            >
                                参加可否を入力する
                            </Button>
                        </Box>

                        <Box marginTop={5}>
                            <Collapse
                                in={opened}
                                onEntered={() => {
                                    scrollToForm();
                                }}
                            >
                                <Paper elevation={4}>
                                    <Box>
                                        <Typography variant="h4" align="center">
                                            イベント出欠記入
                                        </Typography>
                                    </Box>
                                    <form onSubmit={handleSubmit(props.onSubmit)} noValidate>
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
                                                    onChange={(e) => props.setSankashaName(e.target.value)}
                                                    InputLabelProps={{ shrink: props.sankashaName !== "" }}
                                                    inputRef={register}
                                                    value={props.sankashaName}
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
                                                                            checked={
                                                                                sankaKahiValuesState[
                                                                                    `event_nichizi_kouho_id_${row.eventNichijiKouhoId}`
                                                                                ] === "MARU"
                                                                            }
                                                                            onChange={(e) => {
                                                                                handleChange(
                                                                                    e,
                                                                                    row.eventNichijiKouhoId
                                                                                );
                                                                            }}
                                                                            value={SankaKahiType.Maru}
                                                                            name={`event_nichizi_kouho_id_${row.eventNichijiKouhoId}`}
                                                                            inputProps={{ "aria-label": "◯" }}
                                                                            inputRef={register}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Radio
                                                                            checked={
                                                                                sankaKahiValuesState[
                                                                                    `event_nichizi_kouho_id_${row.eventNichijiKouhoId}`
                                                                                ] === "SANKAKU"
                                                                            }
                                                                            onChange={(e) => {
                                                                                handleChange(
                                                                                    e,
                                                                                    row.eventNichijiKouhoId
                                                                                );
                                                                            }}
                                                                            value={SankaKahiType.Sankaku}
                                                                            name={`event_nichizi_kouho_id_${row.eventNichijiKouhoId}`}
                                                                            inputProps={{ "aria-label": "△" }}
                                                                            inputRef={register}
                                                                        />
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        <Radio
                                                                            checked={
                                                                                sankaKahiValuesState[
                                                                                    `event_nichizi_kouho_id_${row.eventNichijiKouhoId}`
                                                                                ] === "BATSU"
                                                                            }
                                                                            onChange={(e) => {
                                                                                handleChange(
                                                                                    e,
                                                                                    row.eventNichijiKouhoId
                                                                                );
                                                                            }}
                                                                            value={SankaKahiType.Batsu}
                                                                            name={`event_nichizi_kouho_id_${row.eventNichijiKouhoId}`}
                                                                            inputProps={{ "aria-label": "✕" }}
                                                                            inputRef={register}
                                                                        />
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
                                                    onChange={(e) => props.setSankashaComment(e.target.value)}
                                                    InputLabelProps={{ shrink: props.sankashaComment !== "" }}
                                                    inputRef={register}
                                                    value={props.sankashaComment}
                                                />
                                            </Box>
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    disabled={props.buttonDisabled}
                                                    type="submit"
                                                >
                                                    出欠を回答する
                                                </Button>
                                            </Box>
                                        </Box>
                                    </form>
                                </Paper>
                            </Collapse>
                        </Box>
                    </Paper>
                )}
                {props.isLoading && (
                    <Box textAlign="center">
                        <CircularProgress />
                    </Box>
                )}
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
