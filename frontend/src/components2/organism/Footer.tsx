import React from "react";

export const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer bg-dark mt-4 text-center">
                <span>
                    Developed by <a href="https://github.com/isoittech/tsugou-kun-react">isoittech</a>
                </span>
                <br />
                <a className="text-secondary" href="https://chouseisan.com/">
                    Respect For Chouseisan
                </a>
            </footer>
        </>
    );
};
