import React from "react";
import Following from "../../Following";
import ProfileHeader from "./ProfileHeader";
import Create from "../Create";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
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
            currentUserFollowing: [],
            userNotFound: false
        }
        this.getUserData = getUserData.bind(this);
        this.getLessons = getLessons.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getUserData(this.props.match.params.username, this.abortController)
            .then(data => {
                this.setUserDataInState(data);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getUserData(this.props.match.params.username, this.abortController)
                .then(data => {
                    this.setUserDataInState(data);
                });
        }
    }

    componentWillUnmount() {
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
                    });
                });
        }
        if  (this.props.currentUser.username) {
            this.getFollowing(this.props.currentUser.username, this.abortController)
                .then(data => {
                    this.setState({
                        currentUserFollowing: data.data.username.following
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
                    description={this.state.description}
                    following={this.state.following}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                />
                {this.props.currentUser.loggedIn && this.props.currentUser.username === this.props.match.params.username &&
                <Create
                    id={this.state.id}
                    currentUser={this.props.currentUser}
                    onAddLesson={this.addLesson}
                />
                }
                <section id="my-lessons" className="primary">
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
                <Following
                    id={this.state.id}
                    loggedIn={this.props.currentUser.loggedIn}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                    username={this.props.match.params.username}
                    following={this.state.following}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                />
            </div>
        );
    }
}

export default Profile;
