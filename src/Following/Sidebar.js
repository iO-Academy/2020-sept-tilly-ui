import React from 'react';
import UserList from "./UserList";
import './following.css';

export default function Sidebar(props) {
    return (
        <div className="sidebarRight">
            <UserList
                listTitle={props.username + "'s teachers"}
                data-id={props.id}
                username={props.username}
                userList={props.following}
                loggedIn={props.loggedIn}
                onFollow={props.onFollow}
                onUnfollow={props.onUnfollow}
                onChangeView={props.onChangeView}
                viewParam="viewFollowing"
                currentUserUsername={props.currentUserUsername}
                currentUserFollowing={props.currentUserFollowing}
            />
            <UserList
                listTitle={props.username + "'s students"}
                data-id={props.id}
                username={props.username}
                userList={props.followers}
                loggedIn={props.loggedIn}
                onFollow={props.onFollow}
                onUnfollow={props.onUnfollow}
                onChangeView={props.onChangeView}
                viewParam="viewFollowers"
                currentUserUsername={props.currentUserUsername}
                currentUserFollowing={props.currentUserFollowing}
            />
            <UserList
                listTitle="you may know"
                data-id={props.id}
                username={props.username}
                userList={props.following}
                loggedIn={props.loggedIn}
                onFollow={props.onFollow}
                onUnfollow={props.onUnfollow}
                onChangeView={props.onChangeView}
                viewParam="viewYouMayKnow"
                currentUserUsername={props.currentUserUsername}
                currentUserFollowing={props.currentUserFollowing}
            />
        </div>
    );
}
