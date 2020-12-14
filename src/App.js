import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./Components/Header";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import LogUp from "./Components/LogUp/LogUp";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {create: true, loggedIn: false, username: ''}
  }

  render() {
    return (
        <Router>

          {!this.state.loggedIn ?
              <Switch>
                <Route path="/:userName">
                  <Profile/>
                </Route>
                <Route path="/">
                  <LogUp />
                </Route>
              </Switch>
              :
            <div>
              <Header/>

              {this.state.create &&
              <Create/>}

              <Switch>
                <Route path={"/" + this.state.username}>
                  <Profile username={this.state.username}/>
                </Route>
                <Route path="/:userName">
                  <Profile />
                </Route>
                <Route path="/">
                  <Timeline/>
                </Route>
              </Switch>
            </div>
          }
        </Router>
    );
  }
}

export default App;
