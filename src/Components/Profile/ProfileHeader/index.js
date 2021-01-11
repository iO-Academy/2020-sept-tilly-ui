import React from "react";
import Button from "../../Button";

export default function ProfileHeader(props) {
    return (
        <div className="profileHeader">
            <div className="profileDetails">
                <div class="profileTitle">
                    <h3>
                        {props.username}
                    </h3>
                    <p className="fade-text">
                        {props.name}
                    </p>
                    <p className="small">
                        {props.lessons.length} lessons
                    </p>
                    {props.currentUser.username !== props.username && props.currentUser.loggedIn &&
                    <div className="profileButton">
                        {props.currentUserFollowing.find(o => o.username === props.username) ?
                            <Button
                                onHandleClick={props.onUnfollow}
                                value={props.id}
                                className="generic unfollow"
                                name="unfollow"
                            />
                            :
                            <Button
                                onHandleClick={props.onFollow}
                                value={props.id}
                                className="generic"
                                name="follow"
                            />
                        }
                    </div>
                    }
                </div>
                <div className="profileBio">
                    {props.description}
                </div>
            </div>
        </div>
    );
}