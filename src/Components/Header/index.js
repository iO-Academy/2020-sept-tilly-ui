import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUser, faCog, faShoePrints } from '@fortawesome/free-solid-svg-icons';

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
                            <FontAwesomeIcon
                                icon={faEllipsisV}
                                alt="my timeline"
                                title="my timeline"
                            />
                            <div className="navText">
                                timeline
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={"/" + this.props.username}>
                            <FontAwesomeIcon
                                icon={faUser}
                                alt="my profile"
                                title="my profile"
                            />
                            <div className="navText">
                                profile
                            </div>
                        </Link>
                    </div>
                </nav>
                <div className="navTwo">
                    <button
                        onClick={this.doNothing}>
                        <FontAwesomeIcon
                            icon={faCog}
                            alt="settings"
                            title="settings"
                        />
                    </button>
                    <button
                        onClick={this.props.onLogOut}>
                        <FontAwesomeIcon
                            icon={faShoePrints}
                            alt="log out"
                            title="log out"
                        />
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
