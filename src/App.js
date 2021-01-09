import React from 'react';
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./Components/Header";
import Logo from "./Components/Header/Logo";
import Profile from "./Components/Profile";
import Friend from "./Components/Profile/Friend";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";
import decoder from "./Functions/decoder";
import getUserData from "./Functions/getUserData";
import getLessons from "./Functions/getLessons";

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
        // this.getData();
    }
    componentWillUnmount() {
        this.abortController.abort();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.id !== this.state.id) {
            if (localStorage.getItem('tillyToken')) {
                const token = localStorage.getItem('tillyToken');
                try {
                    const decoded = this.decoder(token);
                    this.setState({
                        loggedIn: true,
                        id: decoded.id,
                        token: token
                    });
                    this.getUserData(decoded.username, this.abortController)
                } catch(err) {
                    console.log(err);
                    this.logOut();
                }
            }
        }
    }

    // getData = () => {
    //     if (localStorage.getItem('tillyToken')) {
    //         const token = localStorage.getItem('tillyToken');
    //         try {
    //             const decoded = this.decoder(token);
    //             this.setState({
    //                 loggedIn: true,
    //                 id: decoded.id,
    //                 token: token
    //             });
    //             this.getUserData(decoded.username, this.abortController)
    //         } catch(err) {
    //             console.log(err);
    //             this.logOut();
    //         }
    //     }
    // }

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
            id: '',
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: [],
            followers: [],
            allLessons: [],
            tokenError: ''
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

    addLesson = (text) => {
        let stateCopy = {...this.state}
        const lesson = {lesson: text, date: 'just now'};
        stateCopy.lessons.unshift(lesson);
        this.setState({...stateCopy});
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ?
                    <Router>
                        <Header
                            username={this.state.username}
                            onLogOut={this.logOut}
                        />
                        <main>
                            <Switch>
                                <Route
                                    path="/:username"
                                    render={props => <Profile currentUser={this.state} {...props} />}
                                />
                                {/*<Route*/}
                                {/*    path={"/" + this.state.username}>*/}
                                {/*    <Profile*/}
                                {/*        id={this.state.id}*/}
                                {/*        username={this.state.username}*/}
                                {/*        description={this.state.description}*/}
                                {/*        lessons={this.state.lessons}*/}
                                {/*        following={this.state.following}*/}
                                {/*        loggedIn={this.state.loggedIn}*/}
                                {/*        onAddLesson={this.addLesson}*/}
                                {/*        onGetData={this.getData}*/}
                                {/*    />*/}
                                {/*</Route>*/}
                                {/*<Route*/}
                                {/*    path="/:username"*/}
                                {/*    render={props => <Friend myDetails={this.state}*/}
                                {/*                             onGetData={this.getData} {...props} />}*/}
                                {/*/>*/}
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
                                {/*<Route*/}
                                {/*    path="/:username"*/}
                                {/*    render={props => <Friend myDetails={this.state}*/}
                                {/*                             onGetData={this.getData} {...props} />}*/}
                                {/*/>*/}
                                <Route
                                    path="/">
                                    <SignUp
                                        onCreateUser={this.createUser}
                                    />
                                </Route>
                                <Route
                                    path="/:username"
                                    render={props => <Profile currentUser={this.state} {...props} />}
                                />
                            </Switch>
                        </main>
                    </Router>
                }
            </div>
        );
    }
}

export default App;
