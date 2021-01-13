import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button";
import './following.css';

export default function UserList(props) {
    const userList = props.sidebar ? props.userList.slice(0,4) : props.userList;
    return (
        <section className="userList">
            <h5>
                {props.listTitle}
            </h5>
            {props.userList.length > 0 &&
            <div>
                {userList.map((user, i) =>
                    <div
                        key={"user" + i}
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
                {props.sidebar && props.userList.length > userList.length &&
                    (props.name !== "youMayKnow" ?
                        <div className="small center">
                            <Link to={"/" + props.username + "/" + props.name}>
                                and {props.userList.length - userList.length} more
                            </Link>
                        </div> :
                        <div className="small center">
                            <Link onClick={props.youMayKnowLink}>
                                and {props.userList.length - userList.length} more
                            </Link>
                        </div>
                    )
                }
            </div>
            }
            {props.userList.length <= 0 &&
            <div className="small fade-text center">
                nothing here...
            </div>
            }
        </section>
    );
}
