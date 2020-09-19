import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Navbar, Nav, NavItem, NavDropdown, Button, FormControl, Form} from 'react-bootstrap';

type Props = {
    foo: string;
}

export const Top: React.FC<Props> = (props) => {

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Topがよばれたよー")
    });

    return (
        <>
            <div>Topです</div>
        </>
    )
}