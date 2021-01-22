import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './notification.css';

export default function Notifications(props) {

    useEffect(() => {
        return () => props.viewAllNotifications();
    });

    return (
        <section id="my-lessons">
            <h3>notifications</h3>
            {props.currentUser.notifications.map((notification, i) => {
                return (
                    <div className={"notification" + (!notification.viewed ? " unread" : "")}>
                        <span className="fade-text small lesson-date">
                            {notification.date}
                        </span>
                        {notification.type === "like" ?
                            <p>
                                <Link to={"/" + notification.senderUsername}>{notification.senderName}</Link> liked your
                                <Link to={"/" + props.currentUser.username + "/lessons/" + notification.lesson}> lesson</Link>
                            </p> :
                            <p>
                                <Link to={"/" + notification.senderUsername}>{notification.senderName}</Link> followed you
                            </p>
                        }
                    </div>
                );
            })}
        </section>
    );
}