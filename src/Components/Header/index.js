import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Logo
                    padded={false}
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
