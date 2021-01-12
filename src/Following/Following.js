import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Components/Button";
import './following.css';
import ProfileHeader from "../Components/Profile/ProfileHeader";
import Sidebar from "./Sidebar";

export default function Following(props) {
    return (
        <section>
            <h5>
                following
            </h5>
            <h5>
                followers
            </h5>
            <div>
                {props.userList.map((user, i) =>
                    <div
                        key={"userListPage" + i}
                        className="userListItem">
                        <div>
                            <p className="userListUsername">
                                <Link to={"/" + user.username}>
                                    {user.username}
                                </Link>
                            </p>
                            <p className="fade-text x-small">
                                {user.description}
                            </p>
                        </div>
                        {props.loggedIn &&
                        props.currentUserFollowing &&
                        props.currentUserUsername !== user.username &&
                        <div>
                            {!props.currentUserFollowing.find(o => o.username === user.username) ?
                                <Button
                                    className="follow"
                                    onHandleClick={props.onFollow}
                                    value={user.id}
                                    name="+"
                                />
                                :
                                <Button
                                    className="follow unfollow unfollow-rotate"
                                    onHandleClick={props.onUnfollow}
                                    value={user.id}
                                    name="+"
                                />
                            }
                        </div>
                        }
                    </div>
                )}
            </div>
        </section>
    );
}
