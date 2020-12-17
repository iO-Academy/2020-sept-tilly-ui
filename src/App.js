import React from 'react';
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import Friend from "./Components/Friend";
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
            id: '',
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: [],
            followers: [],
            allLessons: []
        }
        this.decoder = decoder.bind(this);
        this.getUserData = getUserData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (localStorage.getItem('tillyToken')) {
            const token = localStorage.getItem('tillyToken');
            const decoded = this.decoder(token);
            token && this.setState({
                loggedIn: true,
                id: decoded.id,
                username: decoded.username
            });
            this.getUserData(decoded);
            console.log(decoded);
        }
    }

    logIn = (id) => {
        this.setState({
            loggedIn: true,
            id: id,
        });
        this.getData();
    }

    logOut = () => {
        localStorage.clear();
        this.setState({loggedIn: false});
        window.location.href = '/login';
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
            <Router>
                {this.state.loggedIn &&
                <Header
                    username={this.state.username}
                    onLogOut={this.logOut}
                />}
                <main>
                    <Switch>
                        {!this.state.loggedIn &&
                        <Route
                            path="/login">
                            <LogIn
                                onLoginSuccess={this.logIn}
                            />
                        </Route>}
                        {this.state.loggedIn &&
                        <Route
                            path={"/" + this.state.username}>
                            <Profile
                                id={this.state.id}
                                username={this.state.username}
                                lessons={this.state.lessons}
                                following={this.state.following}
                                onAddLesson={this.addLesson}
                            />
                        </Route>}
                        <Route
                            path="/:username"
                            component={Friend}
                        />
                        <Route
                            path="/">
                            {this.state.loggedIn ?
                                <Timeline
                                    username={this.state.username}
                                    allLessons={this.state.allLessons}
                                    lessons={this.state.lessons}
                                    following={this.state.following}
                                />
                                :
                                <SignUp
                                    onCreateUser={this.createUser}
                                />}
                        </Route>
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;
