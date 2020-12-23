import React from 'react';
import {Link} from "react-router-dom";

export default function LoginHeader() {
    return (
        <Link to="/">
            <img
                className="logo"
                src="images/tilly1.png"
                alt="tilly logo"
            />
            home
        </Link>
    );
}
