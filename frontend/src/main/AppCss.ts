import { createMuiTheme, makeStyles } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#42629a",
            main: "#05386b",
            dark: "#001340",
            contrastText: "#edf5e1",
        },
        secondary: {
            light: "#92ffc6",
            main: "#5cdb95",
            dark: "#1aa867",
            contrastText: "#05386b",
        },
    },
});

export const useCommonStyles = makeStyles({
    helperText: {
        color: "rgba(0, 0, 0, 0.54)",
        margin: "0",
        fontSize: "0.75rem",
        marginTop: "3px",
        textAlign: "left",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
        fontWeight: 400,
        lineHeight: "1.66",
        letterSpacing: "0.03333em",
    },
});
