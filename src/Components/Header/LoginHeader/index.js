import React from 'react';
import {Link} from "react-router-dom";
import logo from '../../../tilly1.png';

export default function LoginHeader() {
    return (
        <Link to="/">
            <img
                className="logo"
                src={logo}
                alt="tilly logo"
            />
            home
        </Link>
    );
}
