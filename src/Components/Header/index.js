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
                    <div>
                        <Link
                            to="/">
                            timeline
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={"/" + this.props.username}>
                            profile
                        </Link>
                    </div>
                    <div id="navTwo"
                        onClick={this.props.onLogOut}>
                        log out
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
