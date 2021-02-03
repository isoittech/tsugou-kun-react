import { AppBar, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

export const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            Developed by{" "}
            <a href="https://github.com/isoittech/tsugou-kun-react" target="_blank">
                isoittech
            </a>
            <br />
            <a className="text-secondary" href="https://chouseisan.com/" target="_blank">
                Respect For Chouseisan
            </a>
        </footer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // position: "absolute",
            // bottom: 0,
            width: "100%",
            textAlign: "center",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(2),
            "& a:hover": {
                textDecoration: "underline",
                color: theme.palette.secondary.main,
            },
        },
    })
);
