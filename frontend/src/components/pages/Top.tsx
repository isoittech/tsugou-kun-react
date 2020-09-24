import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navbar, Nav, NavItem, NavDropdown, Button, FormControl, Form} from 'react-bootstrap';
import {EventEditCard} from "../molecules/EventEditCard";
import {ApiExecutionState, ApiExecutionStateType} from "../../store/moyooshi_api";
import {ValueOf} from "../../libs/common/declare";

type Props = {
    foo: string;
}

export const Top: React.FC<Props> = (props) => {
    useEffect(() => {
        console.log("Topがよばれたよー")
    });

    return (
        <>
            <div className=" row d-flex justify-content-center my-5">
                <div className="col-sm-10">
                    <EventEditCard/>
                </div>
            </div>
        </>
    )
}