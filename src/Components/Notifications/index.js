import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import Notification from "./Notification";

export default function Notifications(props) {


    return (
        <section id="my-lessons">
            <h3>notifications</h3>
            {this.state.lessons.map((lesson, i) =>
                <Notification
                    key={"lesson" + i}
                    lesson={lesson}
                    name={this.state.name}
                    currentUser={this.props.currentUser}
                    profile={true}
                />
            )}
        </section>
    )
}