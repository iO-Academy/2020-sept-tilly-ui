import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import './nav.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUser, faCog, faShoePrints } from '@fortawesome/free-solid-svg-icons';

class Nav extends React.Component {

    render() {
        return (
            <nav>
                <Logo
                    padded={false}
                />
                <div className="navOne">
                    <Link
                        className="navItem"
                        to="/">
                        <div className="navText">
                            timeline
                        </div>
                        <div className="navIcon">
                            <FontAwesomeIcon
                                icon={faEllipsisV}
                                alt="my timeline"
                                title="my timeline"
                            />
                        </div>
                    </Link>
                    <Link
                        className="navItem"
                        to={"/" + this.props.username}>
                        <div className="navText">
                            profile
                        </div>
                        <div className="navIcon">
                            <FontAwesomeIcon
                                icon={faUser}
                                alt="my profile"
                                title="my profile"
                            />
                        </div>
                    </Link>
                </div>
                <div className="navTwo">
                    <a className="navItem">
                        <div className="navText">
                            settings
                        </div>
                        <div className="navIcon">
                            <FontAwesomeIcon
                                icon={faCog}
                                alt="settings"
                                title="settings"
                            />
                        </div>
                    </a>
                    <a className="navItem"
                        onClick={this.props.onLogOut}>
                        <div className="navText">
                            logout
                        </div>
                        <div className="navIcon">
                            <FontAwesomeIcon
                                icon={faShoePrints}
                                alt="log out"
                                title="log out"
                            />
                        </div>
                    </a>
                </div>
            </nav>
        );
    }
}

export default Nav;
