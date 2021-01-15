import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button";
import './following.css';

export default function UserList(props) {
    const userList = props.sidebar ? props.userList.slice(0,4) : props.userList;
    return (
        <section className="userList">
            {props.sidebar ?
                <p className="center">
                    {props.listTitle}
                </p>
                :
                <h3>
                    {props.listTitle}
                    {props.listTitle === "search results" &&
                        <Button
                            className="exit"
                            onHandleClick={props.onClearSearch}
                            name="+"
                        />
                    }
                </h3>
            }
            {props.userList.length > 0 ?
            <div>
                {userList.map((user, i) =>
                    <div
                        key={"user" + i}
                        className="userListItem">
                        <div className="userListName">
                            <p>
                                <Link to={"/" + user.username}>
                                    {user.name}
                                </Link>
                            </p>
                            <p className="fade-text x-small">
                                @{user.username}
                            </p>
                        </div>
                        {props.loggedIn &&
                        props.currentUserFollowing &&
                        props.currentUserUsername !== user.username &&
                        <div>
                            {!props.currentUserFollowing.find(o => o.username === user.username) ?
                                <Button
                                    className={props.sidebar ? "follow" : "generic"}
                                    onHandleClick={props.onFollow}
                                    value={user.id}
                                    name={props.sidebar ? "+" : "follow"}
                                />
                                :
                                <Button
                                    className={props.sidebar ? "follow unfollow unfollow-rotate" : "generic unfollow"}
                                    onHandleClick={props.onUnfollow}
                                    value={user.id}
                                    name={props.sidebar ? "+" : "unfollow"}
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
                        </div>
                        :
                        <div className="small center">
                            <Link onClick={props.youMayKnowLink}>
                                and {props.userList.length - userList.length} more
                            </Link>
                        </div>
                    )
                }
            </div>
            :
            <div className="small fade-text center">
                nothing here...
            </div>
            }
        </section>
    );
}
