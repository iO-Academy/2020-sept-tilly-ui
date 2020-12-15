import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./Components/Header";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";
import decoder from "./Functions/decoder";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      create: true,
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
        .then(data => this.setState({
          username: data.data.user.username,
          name: data.data.user.name,
          email: data.data.user.email,
          description: data.data.user.description,
          lessons: data.data.user.lessons,
          following: data.data.user.following
        }));
    setTimeout(() => console.log(this.state), 1000);
  }

  logIn = (id) => {
    this.setState({
      loggedIn: true,
      id: id
    });
    console.log(this.state);
  }

  logOut = () => {
    localStorage.clear();
    this.setState({loggedIn: false});
  }

  createUser = (userInfo) => {
    const stateCopy = {...this.state};
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
          {!this.state.loggedIn ?
              <Switch>
                <Route
                    path="/login">
                  <LogIn
                      onLoginSuccess={this.logIn}
                  />
                </Route>
                <Route
                    path="/:userName">
                  <Profile />
                </Route>
                <Route path="/">
                  <SignUp
                      onCreateUser={this.createUser}
                  />
                </Route>
              </Switch>
              :
            <div>
              <Header
                  username={this.state.username}
                  onLogOut={this.logOut}
              />
              <main>
                {this.state.create &&
                <Create
                    id={this.state.id}
                    onCreateLesson={this.addLesson}
                />}
                <Switch>
                  <Route
                      path="/:username">
                    <Profile
                        lessons={this.state.lessons}
                    />
                  </Route>
                  <Route
                      path="/">
                    <Timeline
                        lessons={this.state.lessons}
                    />
                  </Route>
                </Switch>
              </main>
            </div>
          }
        </Router>
    );
  }
}

export default App;
