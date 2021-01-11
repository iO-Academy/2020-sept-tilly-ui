import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Components/Button";
import './following.css';

export default function Following(props) {
    const firstFour = props.following.slice(0,4);
    return (
        <section className="following">
            <h5>
                following
            </h5>
            {props.following.length > 0 &&
            <div>
                {firstFour.map((following, i) =>
                    <div
                        key={"following" + i}
                        className="followItem">
                        <div>
                            <p className="followingUsername">
                                <Link to={"/" + following.username}>
                                    {following.username}
                                </Link>
                            </p>
                            <p className="fade-text x-small">
                                {following.description}
                            </p>
                        </div>
                        {props.loggedIn &&
                        props.currentUserFollowing &&
                        props.currentUserUsername !== following.username &&
                        <div>
                            {!props.currentUserFollowing.find(o => o.username === following.username) ?
                                <Button
                                    className="follow"
                                    onHandleClick={props.onFollow}
                                    value={following.id}
                                    name="+"
                                />
                                :
                                <Button
                                    className="follow unfollow unfollow-rotate"
                                    onHandleClick={props.onUnfollow}
                                    value={following.id}
                                    name="+"
                                />
                            }
                        </div>
                        }
                    </div>
                )}
                <div className="small center">
                    <Link
                        to="">
                        and {props.following.length - 4} more
                    </Link>
                </div>
            </div>
            }
            {props.following.length <= 0 &&
            <div className="small fade-text center">
                this user isn't following anyone yet
            </div>
            }
        </section>
    );
}
