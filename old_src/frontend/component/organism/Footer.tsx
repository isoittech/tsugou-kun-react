import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";

type Props = {
    foo: string;
}

export const Footer: React.FC<Props> = (props) => {

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Footerがよばれたよー")
    });

    return (
        <>
            <footer className="footer bg-dark mt-5 text-center">
                <span>Developed by <a href="https://github.com/isoittech/tsugou-kun-react">isoittech</a></span>
                <a className="text-secondary" href="https://chouseisan.com/">Respect For Chouseisan</a>
            </footer>
        </>
    )
}