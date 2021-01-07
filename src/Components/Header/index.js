import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {

    doNothing = () => {
        console.log('settings button');
    }

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
                            <FontAwesomeIcon icon={faEllipsisV} />
                            <div className="navText">
                                timeline
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={"/" + this.props.username}>
                            <FontAwesomeIcon icon={faUser} />
                            <div className="navText">
                                profile
                            </div>
                        </Link>
                    </div>
                </nav>
                <div className="navTwo">
                    <button
                        onClick={this.doNothing}>
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                    <button
                        onClick={this.props.onLogOut}>
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                        />
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
