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
import UserProfile from "./Components/UserProfile";
import SignUp from "./Components/LogUp/LogUp";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {create: true, loggedIn: false}
  }


  render() {
    return (
        <div>
          {!this.state.loggedIn ?
              <SignUp/> :
              <Router>
                <div>
                  <Header/>

                  {this.state.create &&
                  <Create/>}


                  <Switch>
                    <Route path="/profile">
                      <Profile/>
                    </Route>
                    <Route path="/:userName">
                      <UserProfile />
                    </Route>
                    <Route path="/">
                      <Timeline/>
                    </Route>
                  </Switch>
                </div>
              </Router>
          }
        </div>
    );
  }
}

export default App;
