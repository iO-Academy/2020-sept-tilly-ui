import React from 'react';
import Following from "../Sides/Following";
import Create from "../Create";
import Bio from "../Sides/Bio";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
import getUserData from "../../Functions/getUserData";

// import followFetch from "../../Functions/followFetch";
import './profile.css';
import ProfileHeader from "./ProfileHeader";
import getDate from "../../Functions/getDate";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            username: "",
            name: "",
            email: "",
            description: "",
            // id: this.props.currentUser.id,
            // name: '',
            // username: this.props.match.params.username,
            // email: '',
            // description: this.props.currentUser.description,
            lessons: [],
            // following: [],
            // current: true,
            // token: '',
            following: [],
            currentUserFollowing: []
        }
        // this.follow = follow.bind(this);
        // this.unfollow = unfollow.bind(this);
        this.getUserData = getUserData.bind(this);
        this.getLessons = getLessons.bind(this);
        // this.getFollowing = getFollowing.bind(this);
        // this.followFetch = followFetch.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);
        // this.getFollowingData()
        // this.getLessonData();
    }

    abortController = new AbortController();

    getLessonData = () => {
        this.getLessons(this.props.match.params.username, this.abortController)
            .then(data => {
                // let lessons = [];
                // data.data.username.lessons.forEach(lesson => {
                //     const newDate = getDate(lesson.id)
                //     lessons.unshift({id: lesson.id, lesson: lesson.lesson, date: newDate, username: data.data.username})
                // });
                this.setState({
                    lessons: data
                });
            })
        // console.log(lessons)
    }

    getFollowingData = () => {
        // console.log(this.props)
        if (this.props.match.params.username && this.props.currentUser.username) {
            this.getFollowing(this.props.match.params.username, this.abortController)
                .then(data => {
                    // console.log(data)
                    this.setState({
                        following: data.data.username.following
                    })
                })
            this.getFollowing(this.props.currentUser.username, this.abortController)
                .then(data => {
                    this.setState({
                        currentUserFollowing: data.data.username.following
                    })
                })
        }
    }

    followAction = (event) => {
        console.log(event.target.value)
        this.follow(event, this.abortController)
            .then(data => {
                this.getFollowingData()
            })
    }

    unfollowAction = (event) => {
        console.log(event.target.value)
        this.unfollow(event, this.abortController)
            .then(data => {
                this.getFollowingData()
            })
    }

    addLesson = (text) => {
        let stateCopy = {...this.state}
        const lesson = {lesson: text, date: 'just now'};
        stateCopy.lessons.unshift(lesson);
        this.setState({...stateCopy});
    }

    componentDidMount() {
        this.getUserData(this.props.match.params.username, this.abortController);
        this.getFollowingData();
        this.getLessonData();
        //     this.setState({
    //         id: this.props.currentUser.id,
    //         username: this.props.currentUser.username,
    //         description: this.props.currentUser.description,
    //     });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state)
        if (prevProps !== this.props) {
            // console.log(this.props)

            // this.getLessonData()
            // this.getLessons(this.props.match.params.username, this.abortController)
            // this.setState({
            //     username: this.props.match.params.username
            // })
            this.getFollowingData();
            this.getLessonData();
        }
        // console.log(this.state)
        // console.log(this.props)
        // if (prevProps !== this.props) {
    //         console.log(this.props)
    //         this.setState({
    //             id: this.props.currentUser.id,
    //             username: this.props.currentUser.username,
    //             description: this.props.currentUser.description,
    //             // following: this.getFollowing(this.props.currentUser.username, this.abortController)
    //         });
    //         this.getLessons(this.props.currentUser.username, this.abortController)
    //     }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <div>
                <Create
                    currentUser={this.props.currentUser}
                    username={this.props.match.params.username}
                    id={this.state.id}
                    onCreateLesson={this.addLesson}
                />
                <section id="my-lessons" className="primary">
                    <ProfileHeader
                        username={this.props.match.params.username}
                        id={this.state.id}
                        currentUser={this.props.currentUser}
                        following={this.state.following}
                        currentUserFollowing={this.state.currentUserFollowing}
                        onFollow={this.followAction}
                        onUnfollow={this.unfollowAction}
                    />
                    {this.state.lessons.map((lesson, i) =>
                        <div key={'lesson' + i} className="lesson">
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
                    username={this.props.match.params.username}
                    id={this.state.id}
                    currentUserUsername={this.props.currentUser.username}
                    following={this.state.following}
                    currentUserFollowing={this.state.currentUserFollowing}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                />
            </div>
        );
    }
}

export default Profile;