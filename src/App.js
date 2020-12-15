import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Header from "./Components/Header";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";

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
    }
  }

  componentDidMount() {
    localStorage.getItem('tillyToken') && this.setState({loggedIn: true});
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

  render() {
    return (
        <Router>
          {!this.state.loggedIn ?
              <Switch>
                <Route path="/login">
                  <LogIn />
                </Route>
                <Route path="/:userName">
                  <Profile />
                </Route>
                <Route path="/">
                  <SignUp onCreateUser={this.createUser}/>
                </Route>
              </Switch>
              :
            <div>
              <Header
                  onLogOut={this.logOut}
              />
              {this.state.create &&
              <Create />}
              <Switch>
                <Route path={"/" + this.state.username}>
                  <Profile username={this.state.username} />
                </Route>
                <Route path="/:userName">
                  <Profile
                      username={this.state.username}
                  />
                </Route>
                <Route path="/">
                  <Timeline />
                </Route>
              </Switch>
            </div>
          }
        </Router>
    );
  }
}

export default App;
