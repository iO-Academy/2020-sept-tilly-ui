import React from 'react';
import Following from "../../Sides/Following";
import Bio from "../../Sides/Bio";
import {Redirect} from "react-router-dom";
import getMinimalUserData from "../../../Functions/getMinimalUserData";
import decoder from "../../../Functions/decoder";
import follow from "../../../Functions/follow";
import unfollow from "../../../Functions/unfollow";
import followFetch from "../../../Functions/followFetch";
import Button from "../../Button";
import '../profile.css';
import ProfileHeader from "./ProfileHeader";

class Friend extends React.Component {

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
            notFound: false
        }
        this.getMinimalUserData = getMinimalUserData.bind(this);
        this.decoder = decoder.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.followFetch = followFetch.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getMinimalUserData(this.props.match.params.username, this.abortController);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getMinimalUserData(this.props.match.params.username, this.abortController);
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <div>
                <section id="my-lessons" className="primary">
                    <ProfileHeader
                        id={this.props.id}
                        username={this.state.username}
                        description={this.state.description}
                        myDetails={this.props.myDetails}
                        onFollow={this.follow}
                        onUnfollow={this.unfollow}
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
                    onFollow={this.follow}
                    onUnfollow={this.unfollow}
                    onGetData={this.props.onGetData}
                    myUsername={this.props.myDetails.username}
                    myFollowing={this.props.myDetails.following}
                    following={this.state.following}
                    loggedIn={this.props.myDetails.loggedIn}
                />
                {this.state.notFound && <Redirect to='/' />}
            </div>
        );
    }
}

export default Friend;
