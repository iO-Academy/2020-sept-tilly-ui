import React from "react";
import {Link} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import Create from "../Create";
import ProfileTabs from "./ProfileTabs";
import Lesson from "../Lesson";
import Sidebar from "../Following/Sidebar";
import UserList from "../Following/UserList";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
import getFollowers from "../../Functions/getFollowers";
import getUserData from "../../Functions/getUserData";
import search from "../../Functions/search";
import clearSearch from "../../Functions/clearSearch";
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
            youMayKnow: [],
            display: "",
            matchedUsers: []
        }
        this.getUserData = getUserData.bind(this);
        this.getLessons = getLessons.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);
        this.getFollowers = getFollowers.bind(this);
        this.search = search.bind(this);
        this.clearSearch = clearSearch.bind(this);
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
    }

    followAction = (event) => {
        this.follow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
                this.props.getFollowing();
            });
    }

    unfollowAction = (event) => {
        this.unfollow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
                this.props.getFollowing();
            });
    }

    addLesson = (text) => {
        let stateCopy = {...this.state}
        const lesson = {lesson: text, date: "just now"};
        stateCopy.lessons.unshift(lesson);
        this.setState({...stateCopy});
    }

    handleSearch = (event) => {
        search(event.target.value, this.abortController)
            .then(data => {
                event.target.value ?
                    this.setState({
                        matchedUsers: data.data.search,
                        display: "search"
                    })
                    :
                    this.setState({
                        display: ""
                    });
            });
    }

    render() {
        return (
            this.state.userNotFound ? <h2 className="userNotFound">user not found</h2>
                :
            <div>
                <ProfileHeader
                    id={this.state.id}
                    currentUser={this.props.currentUser}
                    currentUserFollowing={this.props.currentUser.following}
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
                {this.state.display === "search" ?
                    <UserList
                        sidebar={false}
                        username={this.props.currentUser.username}
                        loggedIn={this.props.currentUser.loggedIn}
                        onFollow={this.followAction}
                        onUnfollow={this.unfollowAction}
                        currentUserUsername={this.props.currentUser.username}
                        currentUserFollowing={this.props.currentUser.following}
                        listTitle={"search results"}
                        userList={this.state.matchedUsers}
                        onClearSearch={this.clearSearch}
                    />
                    :
                    <>
                        <ProfileTabs
                            username={this.state.username}
                        />
                        {this.props.match.params.following === "teachers" ?
                            <UserList
                                sidebar={false}
                                listTitle={this.state.username + "'s teachers"}
                                username={this.state.username}
                                userList={this.state.following}
                                loggedIn={this.props.currentUser.loggedIn}
                                onFollow={this.followAction}
                                onUnfollow={this.unfollowAction}
                                currentUserUsername={this.props.currentUser.username}
                                currentUserFollowing={this.props.currentUser.following}
                            />
                            : this.props.match.params.following === "students" ?
                            <UserList
                                sidebar={false}
                                listTitle={this.state.username + "'s students"}
                                username={this.state.username}
                                userList={this.state.followers}
                                loggedIn={this.props.currentUser.loggedIn}
                                onFollow={this.followAction}
                                onUnfollow={this.unfollowAction}
                                currentUserUsername={this.props.currentUser.username}
                                currentUserFollowing={this.props.currentUser.following}
                            />
                            : this.props.match.params.following === "youMayKnow" ?
                            <UserList
                                sidebar={false}
                                listTitle={this.state.username + "'s potential chums"}
                                username={this.state.username}
                                userList={this.state.youMayKnow}
                                loggedIn={this.props.currentUser.loggedIn}
                                onFollow={this.followAction}
                                onUnfollow={this.unfollowAction}
                                currentUserUsername={this.props.currentUser.username}
                                currentUserFollowing={this.props.currentUser.following}
                            />
                            :
                            <section id="my-lessons">
                                {this.props.currentUser.username === this.props.match.params.username ?
                                    <h3>my lessons</h3>
                                    :
                                    <h3>{this.state.name}'s lessons</h3>
                                }
                                {this.state.lessons.map((lesson, i) =>
                                    <Lesson
                                        key={"lesson" + i}
                                        lesson={lesson}
                                        name={this.state.name}
                                        loggedIn={this.props.currentUser.loggedIn}
                                        profile={true}
                                    />
                                )}
                            </section>
                        }
                    </>
                }
                <Sidebar
                    sidebar={true}
                    component={"profile"}
                    username={this.props.match.params.username}
                    following={this.state.following}
                    followers={this.state.followers}
                    youMayKnow={this.state.youMayKnow}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    handleSearch={this.handleSearch}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.props.currentUser.following}
                />
            </div>
        );
    }
}

export default Profile;
