import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./Components/Nav";
import Profile from "./Components/Profile";
import Timeline from "./Components/Timeline";
import SingleLesson from "./Components/SingleLesson";
import SignUp from "./Components/LogUp/SignUp";
import LogIn from "./Components/LogUp/LogIn";
import decoder from "./Functions/decoder";
import getUserData from "./Functions/getUserData";
import getFollowing from "./Functions/getFollowing";
import getLikedLessons from "./Functions/getLikedLessons";
import Notifications from "./Components/Notifications";
import getNotifications from "./Functions/getNotifications";
import viewAllNotifications from "./Functions/viewAllNotifications";
import EditProfile from "./Components/EditProfile";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            id: "",
            name: "",
            username: "",
            email: "",
            hash: "",
            description: "",
            token: "",
            decoded: "",
            tokenError: "",
            following: [],
            youMayKnow: [],
            hasNewNotifications: false,
            likedLessons: [],
            notifications: []
        }
        this.decoder = decoder.bind(this);
        this.getUserData = getUserData.bind(this);
        this.getFollowing = getFollowing.bind(this);
        this.getLikedLessons = getLikedLessons.bind(this);
        this.getNotifications = getNotifications.bind(this);
        this.viewAllNotifications = viewAllNotifications.bind(this);
    }

    abortController = new AbortController();

    componentDidMount = () => {
        this.getData();
        this.getFollowingData();
        this.getLikedLessonsData();
        this.getNotificationsData();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevState.id !== this.state.id) {
            this.getData();
            this.getFollowingData();
            this.getLikedLessonsData();
            this.getNotificationsData();
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
                    .then(data =>
                        this.setState({
                            name: data.data.username.name,
                            email: data.data.username.email,
                            hash: data.data.username.hash,
                            description: data.data.username.description
                        }));
            } catch(err) {
                console.log(err);
            }
        }
    }

    logIn = async (token, decoded) => {
        this.setState({
            loggedIn: true,
            id: decoded.id,
            username: decoded.username,
            token: token,
            decoded: decoded
        });
    }

    logOut = () => {
        localStorage.removeItem('tillyToken');
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

    getFollowingData = () => {
        if (this.state.username) {
            let allFollowing = [];
            let youMayKnow = [];
            this.getFollowing(this.state.username, this.abortController)
                .then(data => {
                    this.setState({
                        following: data.data.username.following
                    })
                    return Promise.all(
                        data.data.username.following.map(user => {
                            return this.getFollowing(user.username, this.abortController);
                        })
                    );
                })
                .then(data => {
                    data.forEach(following => {
                        allFollowing = allFollowing.concat(following.data.username.following);
                    });
                    allFollowing = allFollowing.filter(userObj => {
                        return allFollowing.find(user => {
                            if (user.id === this.state.id ||
                                this.state.following.find(userObj => {
                                    return userObj.id === user.id;
                                })) {
                                return false;
                            }
                            return user.id === userObj.id;
                        }) === userObj;
                    });
                    while(allFollowing.length > 0) {
                        youMayKnow.push(allFollowing.splice(Math.floor(Math.random() * allFollowing.length), 1)[0]);
                    }
                    this.setState({
                        youMayKnow: [...youMayKnow]
                    });
                });
        }
    }

    getLikedLessonsData = () => {
        if (this.state.username) {
            this.getLikedLessons(this.state.username, this.abortController)
                .then(data => {
                    this.setState({
                        likedLessons: data.data.username.likedLessons
                    })
                })
        }
    }

    getNotificationsData = () => {
        if (this.state.username) {
            this.getNotifications(this.state.username, this.abortController)
                .then(data => {
                    this.setState({
                        notifications: data
                    });
                    data.forEach(notification => {
                        !notification.viewed &&
                            this.setState({
                                hasNewNotifications: true
                            });
                    });
                });
        }
    }

    handleViewAllNotifications = () => {
        this.viewAllNotifications(this.state.id, this.state.token, this.abortController)
            .then(() => {
                this.getNotificationsData()
                this.setState({
                    hasNewNotifications: false
                })
            })
    }

    render() {
        return (
            <div>
                <Router>
                    <Nav
                        currentUser={this.state}
                        username={this.state.username}
                        loggedIn={this.state.loggedIn}
                        hasNewNotifications={this.state.hasNewNotifications}
                        onLogOut={this.logOut}
                    />
                    <main>
                        <Switch>
                            {!this.state.loggedIn &&
                            <Route
                                path="/login">
                                <LogIn
                                    onLoginSuccess={this.logIn}
                                />
                            </Route>
                            }
                            {this.state.loggedIn &&
                            <Route
                                path="/notifications"
                                render={props => <Notifications currentUser={this.state}
                                                                viewAllNotifications={this.handleViewAllNotifications}
                                                                {...props} />}
                            />
                            }
                            <Route
                                path="/editProfile"
                                render={props => <EditProfile currentUser={this.state}
                                                              getUserData={this.getData}
                                                                {...props} />}
                            />
                            }
                            <Route
                                path="/:username/lessons/:lessonId"
                                render={props => <SingleLesson currentUser={this.state}
                                                          getFollowing={this.getFollowingData}
                                                          getLikedLessons={this.getLikedLessonsData}
                                                          getNotifications={this.getNotificationsData}
                                                          {...props} />}
                            />
                            <Route
                                path="/:username/:following"
                                render={props => <Profile currentUser={this.state}
                                                          getFollowing={this.getFollowingData}
                                                          getLikedLessons={this.getLikedLessonsData}
                                                          getNotifications={this.getNotificationsData}
                                                          {...props} />}
                            />
                            <Route
                                path="/:username"
                                render={props => <Profile currentUser={this.state}
                                                          getFollowing={this.getFollowingData}
                                                          getLikedLessons={this.getLikedLessonsData}
                                                          getNotifications={this.getNotificationsData}
                                                          {...props} />}
                            />
                            <Route
                                path="/"
                                render={this.state.loggedIn ?
                                    props =>
                                        <Timeline currentUser={this.state}
                                                  getFollowing={this.getFollowingData}
                                                  getLikedLessons={this.getLikedLessonsData}
                                                  getNotifications={this.getNotificationsData}
                                                  {...props}
                                        />
                                    :
                                    props => <SignUp onCreateUser={this.createUser} {...props}
                                    />
                                }
                            />
                        </Switch>
                    </main>
                </Router>
            </div>
        );
    }
}

export default App;
