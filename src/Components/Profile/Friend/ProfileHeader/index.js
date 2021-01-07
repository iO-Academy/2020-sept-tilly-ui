import React from "react";
import Button from "../../../Button";

export default function ProfileHeader(props) {

    return (
        <div className="profileHeader">
            <div className={props.myDetails.loggedIn ? "profileTitleSpaceBetween" : "profileTitleCenter"}>
                <h3>
                    {props.username}'s lessons
                </h3>
                {props.myDetails.loggedIn &&
                <div>
                    {props.myDetails.following.find(o => o.username === props.username) ?
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
            <div className="profileBio fade-text">
                {props.description}
            </div>
        </div>
    )
}
