import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import {useDispatch} from "react-redux";

export const Edit: React.FC = () => {
    const { key } = useParams();

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Editがよばれたよー")
    });

    return (
        <>
            <div>Editです。keyは{key}です。</div>
            {/*<div>Editです。</div>*/}
        </>
    )
}