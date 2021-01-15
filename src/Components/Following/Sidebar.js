import React from 'react';
import UserList from "./UserList";
import './following.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar(props) {
    return (
        <div className="sidebarRight">
            <div
                className="mainSearch">
                <FontAwesomeIcon
                    icon={faSearch}
                    alt="search"
                    className="small"
                />
                <input
                    type="text"
                />
            </div>
            {props.component === "profile" &&
                <div>
                    <UserList
                        sidebar={props.sidebar}
                        name="teachers"
                        listTitle={"@" + props.username + "'s teachers"}
                        data-id={props.id}
                        username={props.username}
                        userList={props.following}
                        loggedIn={props.loggedIn}
                        onFollow={props.onFollow}
                        onUnfollow={props.onUnfollow}
                        currentUserUsername={props.currentUserUsername}
                        currentUserFollowing={props.currentUserFollowing}
                    />
                    <UserList
                        sidebar={props.sidebar}
                        name="students"
                        listTitle={"@" + props.username + "'s students"}
                        data-id={props.id}
                        username={props.username}
                        userList={props.followers}
                        loggedIn={props.loggedIn}
                        onFollow={props.onFollow}
                        onUnfollow={props.onUnfollow}
                        currentUserUsername={props.currentUserUsername}
                        currentUserFollowing={props.currentUserFollowing}
                    />
                </div>
            }
            {props.component === "timeline" &&
                <UserList
                    sidebar={props.sidebar}
                    name="youMayKnow"
                    listTitle="you may know"
                    data-id={props.id}
                    username={props.username}
                    userList={props.youMayKnow}
                    loggedIn={props.loggedIn}
                    onFollow={props.onFollow}
                    onUnfollow={props.onUnfollow}
                    currentUserUsername={props.currentUserUsername}
                    currentUserFollowing={props.currentUserFollowing}
                    youMayKnowLink={props.youMayKnowLink}
                />
            }
        </div>
    );
}
