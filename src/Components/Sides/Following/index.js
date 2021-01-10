import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button";
import '../sides.css';
import getFollowing from "../../../Functions/getFollowing";
import follow from "../../../Functions/follow";
import unfollow from "../../../Functions/unfollow";

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // following: [],
            // currentUserFollowing: []
        }
        // this.follow = follow.bind(this);
        // this.unfollow = unfollow.bind(this);
        // this.getFollowing = getFollowing.bind(this);

        // if (this.props.username && this.props.myUsername) {
        //     this.getFollowing(this.props.username, this.abortController);
        //     this.getFollowing(this.props.myUsername, this.abortController);
        // }
        // console.log(this.state)
        // console.log(this.props)
    }

    abortController = new AbortController();

    componentDidMount() {
        // this.getFollowingData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            console.log(this.props)

            // this.getFollowingData();
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    // getFollowingData = () => {
    //     // console.log(this.props)
    //     if (this.props.username && this.props.myUsername) {
    //         this.getFollowing(this.props.username, this.abortController)
    //             .then(data => {
    //                 // console.log(data)
    //                 this.setState({
    //                     following: data.data.username.following
    //                 })
    //             })
    //         this.getFollowing(this.props.myUsername, this.abortController)
    //             .then(data => {
    //                 this.setState({
    //                     currentUserFollowing: data.data.username.following
    //                 })
    //             })
    //     }
    // }

    // followAction = (event) => {
    //     console.log(event.target.value)
    //     this.follow(event, this.abortController)
    //         .then(data => {
    //             this.getFollowingData()
    //         })
    // }
    //
    // unfollowAction = (event) => {
    //     this.unfollow(event, this.abortController)
    //         .then(data => {
    //             this.getFollowingData()
    //         })
    // }

    render() {
        return (
            <section className="secondary secondary-right">
                <h4>
                    following
                </h4>
                {this.props.following.map(following =>
                    <div
                        className="me-follow">
                        <div>
                            <p>
                                <Link to={"/" + following.username}>
                                    {following.username}
                                </Link>
                            </p>
                            <p className="fade-text x-small">
                                {following.description}
                            </p>
                        </div>
                        {this.props.loggedIn &&
                        <div>
                            {this.props.currentUserUsername !== following.username &&
                            this.props.currentUserFollowing &&
                            !this.props.currentUserFollowing.find(o => o.username === following.username) &&
                            <Button
                                className="follow"
                                onHandleClick={this.props.onFollow}
                                value={following.id}
                                name="+"
                            />
                            }
                            {this.props.currentUserFollowing &&
                            this.props.currentUserFollowing.find(o => o.username === following.username) &&
                            <Button
                                className="follow unfollow unfollow-rotate"
                                onHandleClick={this.props.onUnfollow}
                                value={following.id}
                                name="+"
                            />
                            }
                        </div>
                        }
                    </div>
                )}
            </section>
        );
    }
}

export default Following;