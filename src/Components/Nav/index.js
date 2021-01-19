import React from 'react';
import {Link, withRouter} from "react-router-dom";
import Logo from "./Logo";
import LightSwitch from "../LightSwitch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUser, faBell, faCog, faShoePrints, faHammer, faKey } from '@fortawesome/free-solid-svg-icons';
import './nav.css';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dark: true
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem('lightSwitch')) {
            const lightSwitch = JSON.parse(localStorage.getItem('lightSwitch'));
            if (!lightSwitch.dark) document.documentElement.classList.add('light');
            this.setState({...lightSwitch});
        }
    }

    setMode = () => {
        document.documentElement.classList.toggle('light');
        this.setState(prevState => ({
            dark: !prevState.dark
        }));
        setTimeout(() => {
            const lightSwitch = {...this.state};
            localStorage.setItem('lightSwitch', JSON.stringify(lightSwitch));
        }, 50);
    }

    render() {
        return (
            <nav className={
                !this.props.loggedIn
                && (this.props.location.pathname === "/login" || this.props.location.pathname === "/")
                ? "navLogin" : null}>
                <Logo />
                {this.props.loggedIn ?
                    <div>
                        <Link
                            className="navItem navOne"
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
                            className="navItem navOne"
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
                        <a
                            className="navItem navOne">
                            <div className="navText">
                                notifications
                            </div>
                            <div className="navIcon">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    alt="my notifications"
                                    title="my notifications"
                                    className={"navNotification" + this.props.hasNotifications ? " hasNotifications" : ""}
                                />
                                {this.props.hasNotifications &&
                                <div className="notificationDot"></div>
                                }
                            </div>
                        </a>
                        <a className="navItem navTwo">
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
                        <a className="navItem navTwo"
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
                        <LightSwitch
                            checked={this.state.dark}
                            onHandleChange={this.setMode}
                        />
                    </div>
                    :
                    <div>
                        {(this.props.location.pathname === "/login" || this.props.location.pathname === "/") &&
                        <h5>
                            tilly
                        </h5>
                        }
                        <Link
                            className="navItem navTwo"
                            to="/">
                            <div className="navText">
                                create account
                            </div>
                            <div className="navIcon">
                                <FontAwesomeIcon
                                    icon={faHammer}
                                    alt="log out"
                                    title="log out"
                                />
                            </div>
                        </Link>
                        <Link
                            className="navItem navTwo"
                            to="/login">
                            <div className="navText">
                                log in
                            </div>
                            <div className="navIcon">
                                <FontAwesomeIcon
                                    icon={faKey}
                                    alt="log in"
                                    title="log in"
                                />
                            </div>
                        </Link>
                    </div>
                }
            </nav>
        );
    }
}

export default withRouter(Nav);
