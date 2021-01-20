import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './notification.css';

export default function Notification(props) {
    // const [options, openOptions] = useState(false);
    // const [share, openShare] = useState(false);

    return (
        <div className="notification">
            <span className="small">
                <Link to={"/" + props.lesson.username}>
                    {props.lesson.name}
                </Link>
            </span>
            <span className="fade-text small notification-username">
                @{props.lesson.username}
            </span>
            <span className="fade-text small lesson-date">
                {props.lesson.date}
            </span>
            {props.lesson.username === props.currentUser.username &&
            <Button
                className="lesson-options delete"
                name="..."
                onHandleClick={() => openOptions(true)}
            />
            }
            {props.lesson.username === props.currentUser.username && options &&
            <div className="lesson-options">
                <div
                    className="lesson-modal-bg"
                    onClick={closeOptions}>
                </div>
                <button
                    className="lesson-options-list"
                    onClick={() => console.log('doing this will delete it')}>
                    delete
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </button>
            </div>
            }
            <p>
                {props.lesson.lesson}
            </p>
            <span className="action-bar">
                <button>
                    <FontAwesomeIcon icon={faHeartLine} />
                </button>
                <button
                    onClick={shareLink}>
                    <FontAwesomeIcon icon={faShareAlt} />
                </button>
                {share &&
                <span className="lesson-share-notify">
                    link copied to clipboard!
                </span>
                }
            </span>
        </div>
    );
}