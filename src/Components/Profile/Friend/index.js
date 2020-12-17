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

    componentDidMount() {
        this.getMinimalUserData(this.props.match.params.username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getMinimalUserData(this.props.match.params.username);
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        const signal = controller.signal;
        controller.abort();
    }

    render() {
        return (
            <div>
                <Bio
                    username={this.state.username}
                    description={this.state.description}
                />
                <section id="my-lessons" className="primary">
                    {this.props.myDetails.loggedIn &&
                    <div>
                        {!this.props.myDetails.following.find(o => o.username === this.state.username) &&
                            <Button
                                onHandleClick={this.follow}
                                value={this.state.id}
                                className="generic"
                                name="follow"
                            />
                        }
                        {this.props.myDetails.following.find(o => o.username === this.state.username) &&
                            <Button
                                onHandleClick={this.unfollow}
                                value={this.state.id}
                                className="generic unfollow"
                                name="unfollow"
                            />
                        }
                    </div>
                    }
                    <h3>
                        {this.state.username}'s lessons
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
