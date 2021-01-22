import React from 'react';
import { Link } from "react-router-dom";
import './notification.css';

export default function Notifications(props) {

    return (
        <section>
            <h3>notifications</h3>
            {props.currentUser.notifications.map((notification, i) =>
                    <div className="notification">
                        <span className="fade-text small lesson-date">
                            {notification.date}
                        </span>
                        {notification.type === "like" ?
                            <p>
                                <Link to={"/" + notification.senderUsername}>
                                    {notification.senderName}
                                </Link> liked your lesson
                            </p>
                            :
                            <p>
                                <Link to={"/" + notification.senderUsername}>
                                    {notification.senderName}
                                </Link> followed you
                            </p>
                        }
                    </div>
            )}
        </section>
    )
}