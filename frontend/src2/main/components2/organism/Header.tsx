import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar>
                <Link to="/">
                    <Typography variant="h6">都合くん「この日空いてるっすか。」</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            top: 0,
            width: "100%",
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

// import React from "react";
// import { Navbar, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export const Header: React.FC = () => {
//     return (
//         <>
//             <Navbar className={"navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-5 shadow"} expand="lg">
//                 <Navbar.Brand href="/" className={"navbar-brand"}>
//                     都合くん「この日空いてるっすか。」
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mr-auto">
//                         <Link to="/" className={"nav-link"}>
//                             Home
//                         </Link>
//                         {/*<Nav.Link href="/">Home</Nav.Link>*/}
//                         {/*<Nav.Link href="/edit/aieuo">Edit</Nav.Link>*/}
//                         {/*                       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//                             <NavDropdown.Divider/>
//                             <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//                         </NavDropdown>*/}
//                     </Nav>
//                     {/*                    <Form inline>
//                         <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
//                         <Button variant="outline-success">Search</Button>
//                     </Form>*/}
//                 </Navbar.Collapse>
//             </Navbar>
//         </>
//     );
// };
