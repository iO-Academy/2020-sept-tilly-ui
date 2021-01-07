import React from 'react';
import Logo from "./Logo";
import {Link} from "react-router-dom";
import './header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
                            timeline
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={"/" + this.props.username}>
                            profile
                        </Link>
                    </div>
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
                </nav>
            </header>
        );
    }
}

export default Header;
