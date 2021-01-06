import React from 'react';
import Following from "../Sides/Following";
import Create from "../Create";
import Bio from "../Sides/Bio";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import followFetch from "../../Functions/followFetch";
import './profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: [],
            current: true,
            token: ''
        }
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.followFetch = followFetch.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.setState({
            username: this.props.username,
            description: this.props.description,
            lessons: this.props.lessons,
            following: this.props.following
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                id: this.props.id,
                username: this.props.username,
                description: this.props.description,
                lessons: this.props.lessons,
                following: this.props.following
            });
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <div>
                <Bio
                    username={this.state.username}
                    description={this.state.description}
                />
                <Create
                    id={this.props.id}
                    onCreateLesson={this.props.onAddLesson}
                />
                <section id="my-lessons" className="primary">
                    <h3>
                        my lessons
                    </h3>
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
                    onUnfollow={this.unfollow}
                    myUsername={this.state.myUsername}
                    myFollowing={this.state.following}
                    following={this.state.following}
                    loggedIn={this.props.loggedIn}
                />
            </div>
        );
    }
}

export default Profile;
