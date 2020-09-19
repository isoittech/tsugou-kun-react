import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

type Props = {
    foo: string;
}

export const Footer: React.FC<Props> = (props) => {

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Headerがよばれたよー")
    });

    return (
        <>
            <div>
                フッタでーす
                Props: {props.foo}
            </div>
        </>
    )
}