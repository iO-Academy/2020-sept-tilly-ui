import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../../tilly.svg";

export default function Logo(props) {
    return (
        <div className="logo">
            <Link to="/">
                <img

                    className={props.padded ? "logoImgLogup" : "logoImg"}
                    src={logo}
                    alt="tilly logo"
                />
            </Link>
        </div>
    );
}
