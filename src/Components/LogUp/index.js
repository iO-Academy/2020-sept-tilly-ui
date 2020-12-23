import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginHeader from "../Header/LoginHeader";
import LogIn from "./LogIn";
import Friend from "../Profile/Friend";
import SignUp from "./SignUp";

class LogUp extends React.Component {

    render() {
        return (
            <Router>
                <LoginHeader />
                <main>
                    <Switch>
                        <Route
                            path="/login">
                            <LogIn
                                onLoginSuccess={this.props.onLogIn}
                            />
                        </Route>
                        <Route
                            path="/:username"
                            render={props => <Friend myDetails={this.props.myDetails} onGetData={this.props.onGetData} {...props} />}
                        />
                        <Route
                            path="/">
                                <SignUp
                                    onCreateUser={this.props.onCreateUser}
                                />
                        </Route>
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default LogUp;
