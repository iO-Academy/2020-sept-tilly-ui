import React from 'react';
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";
import decoder from "./Functions/decoder";

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
            following: []
        }
        this.decoder = decoder.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    getCurrentUser = () => {
        if (localStorage.getItem('tillyToken')) {
            const token = localStorage.getItem('tillyToken');
            const decoded = this.decoder(token);
            token && this.setState({
                loggedIn: true,
                id: decoded.id
            });
            const query = `query {
              user (id: "${decoded.id}") {
                username,
                name,
                email,
                description,
                following {
                  name
                }
                lessons {
                  id,
                  lesson
                }
              }
            }`
            fetch('http://localhost:4002/graphql', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(r => r.json())
                .then(data => {
                    let lessons = [];
                    data.data.user.lessons.forEach(lesson => {
                        const date = lesson.id.toString().substring(0,8)
                        const convert = new Date(parseInt(date, 16) * 1000)
                        const newDate =convert.toLocaleDateString("EN-GB")
                        lessons.unshift({lesson: lesson.lesson, date: newDate})
                    })
                    this.setState({
                        username: data.data.user.username,
                        name: data.data.user.name,
                        email: data.data.user.email,
                        description: data.data.user.description,
                        lessons: lessons,
                        following: data.data.user.following
                    })
                });
            setTimeout(() => console.log(this.state), 1000);
        }
    }

    logIn = (id) => {
        this.setState({
            loggedIn: true,
            id: id,
        });
        this.getCurrentUser();
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
        let newState = {...this.state};
        const lesson = {lesson: text, date: 'just now'};
        newState.lessons.unshift(lesson);
        this.setState({newState});
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
                        <Route
                            path="/:username">
                            <Profile
                                lessons={this.state.lessons}
                                id={this.state.id}
                                username={this.state.username}
                                onAddLesson={this.addLesson}
                            />
                        </Route>
                        <Route
                            path="/">
                            {this.state.loggedIn ?
                                <Timeline
                                    lessons={this.state.lessons}
                                    following={this.state.following}
                                    username={this.state.username}
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
