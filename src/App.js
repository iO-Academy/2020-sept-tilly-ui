import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./Components/Nav";
import Logo from "./Components/Nav/Logo";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";
import decoder from "./Functions/decoder";
import getUserData from "./Functions/getUserData";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            id: "",
            name: "",
            username: "",
            email: "",
            description: "",
            token: "",
            decoded: "",
            tokenError: "",
        }
        this.decoder = decoder.bind(this);
        this.getUserData = getUserData.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.id !== this.state.id) {
            this.getData();
        }
    }

    getData = () => {
        if (localStorage.getItem('tillyToken')) {
            const token = localStorage.getItem('tillyToken');
            try {
                const decoded = this.decoder(token);
                this.setState({
                    loggedIn: true,
                    id: decoded.id,
                    username: decoded.username,
                    token: token
                });
                this.getUserData(decoded.username, this.abortController)
            } catch(err) {
                console.log(err);
            }
        }
    }

    logIn = async (token, decoded) => {
        this.setState({
            loggedIn: true,
            id: decoded.id,
            token: token,
            decoded: decoded
        });
        // this.getData();
    }

    logOut = () => {
        localStorage.clear();
        this.setState({
            loggedIn: false,
            id: "",
            name: "",
            username: "",
            email: "",
            description: "",
            token: "",
            decoded: "",
            tokenError: "",
        });
    }

    createUser = (userInfo) => {
        let stateCopy = {...this.state};
        stateCopy.name = userInfo.name;
        stateCopy.username = userInfo.username;
        stateCopy.email = userInfo.email;
        stateCopy.description = userInfo.description;
        stateCopy.loggedIn = true;
        this.setState({...stateCopy});
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ?
                    <Router>
                        <Nav
                            username={this.state.username}
                            onLogOut={this.logOut}
                        />
                        <main>
                            <Switch>
                                <Route
                                    path="/:username/:following"
                                    render={props => <Profile currentUser={this.state} {...props} />}
                                />
                                <Route
                                    path="/:username"
                                    render={props => <Profile currentUser={this.state} {...props} />}
                                />
                                <Route
                                    path="/">
                                    <Timeline
                                        currentUser={this.state}
                                    />
                                </Route>
                            </Switch>
                        </main>
                    </Router>
                    :
                    <Router>
                        <Logo
                            padded={true}
                        />
                        <main>
                            <Switch>
                                <Route
                                    path="/login">
                                    <LogIn
                                        onLoginSuccess={this.logIn}
                                    />
                                </Route>
                                <Route
                                    path="/:username"
                                    render={props => <Profile currentUser={this.state} {...props} />}
                                />
                                <Route
                                    path="/">
                                    <SignUp
                                        onCreateUser={this.createUser}
                                    />
                                </Route>
                            </Switch>
                        </main>
                    </Router>
                }
            </div>
        );
    }
}

export default App;
