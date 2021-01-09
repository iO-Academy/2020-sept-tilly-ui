import React from 'react';
import Following from "../Sides/Following";
import Create from "../Create";
import Bio from "../Sides/Bio";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";

// import followFetch from "../../Functions/followFetch";
import './profile.css';
import ProfileHeader from "./ProfileHeader";
import getDate from "../../Functions/getDate";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.currentUser.id,
            name: '',
            username: this.props.match.params.username,
            email: '',
            description: this.props.currentUser.description,
            lessons: [],
            // following: [],
            current: true,
            token: ''
        }
        // this.follow = follow.bind(this);
        // this.unfollow = unfollow.bind(this);
        this.getLessons = getLessons.bind(this);
        // this.getFollowing = getFollowing.bind(this);
        // this.followFetch = followFetch.bind(this);
        this.getLessonData();
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


    // componentDidMount() {
    //     this.setState({
    //         id: this.props.currentUser.id,
    //         username: this.props.currentUser.username,
    //         description: this.props.currentUser.description,
    //     });
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            // this.getLessonData()
            // this.getLessons(this.props.match.params.username, this.abortController)
            this.setState({
                username: this.props.match.params.username
            })
        }
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
                    id={this.props.id}
                    onCreateLesson={this.props.onAddLesson}
                />
                <section id="my-lessons" className="primary">
                    <ProfileHeader
                        username={this.props.match.params.username}
                        currentUser={this.props.currentUser}
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
                    myUsername={this.props.currentUser.username}
                    loggedIn={this.props.loggedIn}
                />
            </div>
        );
    }
}

export default Profile;