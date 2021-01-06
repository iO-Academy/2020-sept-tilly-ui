import React from 'react';
import {Link} from "react-router-dom";

export default function Logo(props) {
    return (
        <div className="logo">
            <Link to="/">
                <img

                    class={props.padded ? "logoImgLogup" : "logoImg"}
                    src="images/tilly.svg"
                    alt="tilly logo"
                />
            </Link>
        </div>
    );
}
