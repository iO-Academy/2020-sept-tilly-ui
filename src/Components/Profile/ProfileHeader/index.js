import React from "react";
import Button from "../../Button";
import follow from "../../../Functions/follow";
import unfollow from "../../../Functions/unfollow";
import getFollowing from "../../../Functions/getFollowing";

class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // currentUserFollowing: []
        }
        // this.follow = follow.bind(this);
        // this.unfollow = unfollow.bind(this);
        // this.getFollowing = getFollowing.bind(this);

        // if (this.props.currentUser) {
        //     this.getFollowing("currentUserFollowing", this.props.currentUser.username, this.abortController);
        // }
    }

    abortController = new AbortController();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            // this.getFollowingData()
        }
    }

    // getFollowingData = () => {
    //     if (this.props.currentUser.username) {
    //         this.getFollowing(this.props.currentUser.username, this.abortController)
    //             .then(data => {
    //                 this.setState({
    //                     currentUserFollowing: data.data.username.following
    //                 })
    //             })
    //     }
    // }

    // followAction = (event) => {
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
            this.props.currentUser.username !== this.props.username &&
            <div className="profileHeader">
                <div className={this.props.currentUser.loggedIn ? "profileTitleSpaceBetween" : "profileTitleCenter"}>
                    <h3>
                        {this.props.username}
                    </h3>
                    {this.props.currentUser.loggedIn &&
                    <div>
                        {this.props.currentUserFollowing &&
                        this.props.currentUserFollowing.find(o => o.username === this.props.username) ?
                            <Button
                                onHandleClick={this.props.onUnfollow}
                                value={this.props.id}
                                className="generic unfollow"
                                name="unfollow"
                            />
                            :
                            <Button
                                onHandleClick={this.props.onFollow}
                                value={this.props.id}
                                className="generic"
                                name="follow"
                            />
                        }
                    </div>
                    }
                </div>
                <div className="profileBio fade-text">
                    {this.props.currentUser.description}
                </div>
            </div>
        );
    }
}

export default ProfileHeader;