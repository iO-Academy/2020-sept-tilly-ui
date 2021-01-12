import React from "react";
import ProfileHeader from "./ProfileHeader";
import Create from "../Create";
import Sidebar from "../../Following/Sidebar";
import UserList from "../../Following/UserList";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
import getFollowers from "../../Functions/getFollowers";
import getUserData from "../../Functions/getUserData";
import "./profile.css";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            username: "",
            name: "",
            email: "",
            description: "",
            lessons: [],
            following: [],
            followers: [],
            currentUserFollowing: [],
            userNotFound: false,
            youMayKnow: []
        }
        this.getUserData = getUserData.bind(this);
        this.getLessons = getLessons.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);
        this.getFollowers = getFollowers.bind(this);
    }

    abortController = new AbortController();

    componentDidMount = () => {
        this.getUserData(this.props.match.params.username, this.abortController)
            .then(data => {
                this.setUserDataInState(data);
            });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps !== this.props) {
            this.getUserData(this.props.match.params.username, this.abortController)
                .then(data => {
                    this.setUserDataInState(data);
                });
        }
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    setUserDataInState = (data) => {
        if (data.data.username === null) {
            this.setState({
                userNotFound: true
            });
        } else {
            this.setState({
                id: data.data.username.id,
                username: data.data.username.username,
                name: data.data.username.name,
                email: data.data.username.email,
                description: data.data.username.description
            });
            this.getFollowingData();
            this.getLessonData();
        }
    }

    getLessonData = () => {
        this.getLessons(this.props.match.params.username, this.abortController)
            .then(data => {
                this.setState({
                    lessons: data
                });
            });
    }

    getFollowingData = () => {
        if (this.props.match.params.username) {
            this.getFollowing(this.props.match.params.username, this.abortController)
                .then(data => {
                    this.setState({
                        following: data.data.username.following
                    })
                })
            this.getFollowers(this.props.match.params.username, this.abortController)
                .then(data => {
                    this.setState({
                        followers: data.data.username.followers
                    })
                })
        }
        if (this.props.currentUser.username) {
            let allFollowing = [];
            let youMayKnow = [];
            this.getFollowing(this.props.currentUser.username, this.abortController)
                .then(data => {
                    this.setState({
                        currentUserFollowing: data.data.username.following
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
                            if (user.id === this.props.currentUser.id ||
                                this.state.currentUserFollowing.find(userObj => {
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

    followAction = (event) => {
        this.follow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
            });
    }

    unfollowAction = (event) => {
        this.unfollow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
            });
    }

    addLesson = (text) => {
        let stateCopy = {...this.state}
        const lesson = {lesson: text, date: "just now"};
        stateCopy.lessons.unshift(lesson);
        this.setState({...stateCopy});
    }

    renderSwitch = (content) => {
        switch (content) {
            case "teachers":
                return <UserList
                    sidebar={false}
                    name="teachers"
                    listTitle={this.state.username + "'s teachers"}
                    username={this.state.username}
                    userList={this.state.following}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                />
            case "students":
                return <UserList
                    sidebar={false}
                    name="students"
                    listTitle={this.state.username + "'s students"}
                    username={this.state.username}
                    userList={this.state.followers}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                />
            case "youMayKnow":
                return <UserList
                    sidebar={false}
                    name="teachers"
                    listTitle={this.state.username + "'s potential chums"}
                    username={this.state.username}
                    userList={this.state.youMayKnow}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                />
            default:
                return <section id="my-lessons" className="primary">
                    {this.props.currentUser.username === this.props.match.params.username ?
                        <h3>my lessons</h3>
                        :
                        <h3>{this.state.username}'s lessons</h3>
                    }
                    {this.state.lessons.map((lesson, i) =>
                        <div key={"lesson" + i} className="lesson">
                            <span className="fade-text small">
                                {lesson.date}
                            </span>
                            <p>
                                {lesson.lesson}
                            </p>
                        </div>
                    )}
                </section>
        }
    }

    render() {
        return (
            this.state.userNotFound ? <h2 className="userNotFound">user not found</h2>
                :
            <div>
                <ProfileHeader
                    id={this.state.id}
                    currentUser={this.props.currentUser}
                    currentUserFollowing={this.state.currentUserFollowing}
                    username={this.props.match.params.username}
                    name={this.state.name}
                    lessons={this.state.lessons}
                    description={this.state.description}
                    following={this.state.following}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                />
                {this.props.currentUser.username === this.props.match.params.username &&
                <Create
                    id={this.state.id}
                    currentUser={this.props.currentUser}
                    onAddLesson={this.addLesson}
                />
                }
                {this.renderSwitch(this.props.match.params.following)}
                <Sidebar
                    sidebar={true}
                    username={this.props.match.params.username}
                    following={this.state.following}
                    followers={this.state.followers}
                    youMayKnow={this.state.youMayKnow}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                />
            </div>
        );
    }
}

export default Profile;
