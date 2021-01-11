import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Components/Button";
import './following.css';

export default function Following(props) {
    return (
        <section className="secondary secondary-right">
            <h4>
                following
            </h4>
            {props.following.length > 0 ? props.following.map((following, i) =>
                <div
                    key={"following" + i}
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
            )
            :
            <div className="small fade-text center">this user isn't following anyone yet</div>
            }
        </section>
    );
}
