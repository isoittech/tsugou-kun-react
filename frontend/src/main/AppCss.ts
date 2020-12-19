import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: "#00bcd4",
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
