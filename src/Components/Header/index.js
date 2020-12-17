import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <header>
                <img
                    src="images/tilly1.png"
                    alt="tilly logo"
                />
                <nav>
                    <Link
                        to="/">
                        timeline
                    </Link>
                    <Link
                        to={"/" + this.props.username}>
                        profile
                    </Link>
                </nav>
                <div
                    id="navTwo">
                    <div>
                        settings
                    </div>
                    <div
                        onClick={this.props.onLogOut}>
                        log out
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;