import React from "react";
import Button from "../../Button";
import follow from "../../../Functions/follow";
import unfollow from "../../../Functions/unfollow";
import getFollowing from "../../../Functions/getFollowing";

class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUserFollowing: []
        }
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);

        if (this.props.myUsername) {
            this.getFollowing("currentUserFollowing", this.props.myUsername, this.abortController);
        }
    }

    abortController = new AbortController();

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props && this.props.myUsername) {
            this.getFollowing("currentUserFollowing", this.props.myUsername, this.abortController);
        }
    }

    render() {
        return (
            <div className="profileHeader">
                <div className={this.props.currentUser.loggedIn ? "profileTitleSpaceBetween" : "profileTitleCenter"}>
                    <h3>
                        {this.props.currentUser.username}
                    </h3>
                    {this.props.currentUser.loggedIn &&
                    <div>
                        {this.state.currentUserFollowing.find(o => o.username === this.props.currentUser.username) ?
                            <Button
                                onHandleClick={this.unfollow}
                                value={this.props.currentUser.id}
                                className="generic unfollow"
                                name="unfollow"
                            />
                            :
                            <Button
                                onHandleClick={this.follow}
                                value={this.props.currentUser.id}
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