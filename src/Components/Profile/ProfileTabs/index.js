import React from "react";
import {NavLink} from "react-router-dom";

export default function ProfileTabs(props) {
    return (
        <div className="profileTabs">
            <NavLink
                exact to={"/" + props.username}
                activeClassName="currentTab">
                lessons
            </NavLink>
            <span>
                |
            </span>
            <NavLink
                exact to={"/" + props.username + "/teachers"}
                activeClassName="currentTab">
                teachers
            </NavLink>
            <span>
                |
            </span>
            <NavLink
                exact to={"/" + props.username + "/students"}
                activeClassName="currentTab">
                students
            </NavLink>
        </div>
    );
}