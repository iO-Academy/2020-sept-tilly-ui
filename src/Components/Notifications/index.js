import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './notification.css';

export default function Notifications(props) {

    return (
        <section id="my-lessons">
            <h3>notifications</h3>
            {props.currentUser.notifications.map((notification, i) => {
                return (
                    <div className="notification">
                        <span className="fade-text small lesson-date">
                            {notification.date}
                        </span>
                        {notification.type === "like" ?
                            <p>
                                <Link to={"/" + notification.senderUsername}>{notification.senderName}</Link> liked your lesson
                            </p> :
                            <p>
                                <Link to={"/" + notification.senderUsername}>{notification.senderName}</Link> followed you
                            </p>
                        }
                    </div>
                )
            })}
        </section>
    )
}