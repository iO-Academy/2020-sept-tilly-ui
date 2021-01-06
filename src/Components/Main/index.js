import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Header from "../Header";
import Profile from "../Profile";
import Friend from "../Profile/Friend";
import Timeline from "../Timeline";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.myDetails
        }
    }

    render() {
        return (
            <Router>
                <Header
                    username={this.state.username}
                    onLogOut={this.logOut}
                />
                <main>
                    <Switch>
                        <Route
                            path={"/" + this.state.username}>
                            <Profile
                                id={this.state.id}
                                username={this.state.username}
                                description={this.state.description}
                                lessons={this.state.lessons}
                                following={this.state.following}
                                loggedIn={this.state.loggedIn}
                                onAddLesson={this.addLesson}
                                onGetData={this.getData}
                            />
                        </Route>
                        <Route
                            path="/:username"
                            render={props => <Friend myDetails={this.state} onGetData={this.getData} {...props} />}
                        />
                        <Route
                            path="/">
                            <Timeline
                                username={this.state.username}
                                allLessons={this.state.allLessons}
                                lessons={this.state.lessons}
                                following={this.state.following}
                            />
                        </Route>
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default Main;
