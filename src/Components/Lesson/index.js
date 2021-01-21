import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import getLikedLessons from "../../Functions/getLikedLessons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './lesson.css';
import '../Button/buttons.css';
import createNotification from "../../Functions/createNotification";

export default function Lesson(props) {
    const [options, openOptions] = useState(false);
    const [share, openShare] = useState(false);

    useEffect(() => {
        document.addEventListener('keyup', closeOptions, false);
        return () => {
            document.removeEventListener('keyup', closeOptions, false);
        };
    });

    function closeOptions(event) {
        if (event.target.classList.contains('lesson-modal-bg') || event.key === "Escape") openOptions(false);
    }

    function shareLink() {
        navigator.clipboard.writeText(window.location.origin + props.lesson.username + "/lessons/" + props.lesson.id)
            .then(data => {
                openShare(true);
                setTimeout(() => openShare(false), 5000);
            });
    }

    let likeLesson = () => {
        const query = `
        mutation {
            like (
                user: "${props.currentUser.id}",
                lesson: "${props.lesson.id}",
                token: "${props.currentUser.token}"
            )
        }`;
        return fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                r.data.like &&
                createNotification(
                    props.currentUser.id,
                    props.lesson.userId,
                    "like",
                    props.currentUser.token,
                    props.lesson.id
                )
                    .then(() => {
                        props.getNotifications()
                    })
                props.getLikedLessons();
            });
    }

    let unlikeLesson = () => {
        const query = `
        mutation {
            unlike (
                user: "${props.currentUser.id}",
                lesson: "${props.lesson.id}",
                token: "${props.currentUser.token}"
            )
        }`;
        return fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                props.getLikedLessons();
            });
    }

    let deleteLesson = () => {
        const query = `mutation {
            deleteLesson (
                user: "${props.currentUser.id}",
                lesson: "${props.lesson.id}",
                token: "${props.currentUser.token}"
            )
        }`
        return fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                props.getLessonsAgain();
                openOptions(false);
            });
    }

    return (
        <div className="lesson">
            <span className="small">
                <Link to={"/" + props.lesson.username}>
                    {props.lesson.name}
                </Link>
            </span>
            <span className="fade-text small lesson-username">
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
                    onClick={deleteLesson}>
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
                {props.currentUser.likedLessons.find(o => o.id === props.lesson.id) ?
                    <button
                        onClick={unlikeLesson}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    :
                    <button
                        onClick={likeLesson}>
                        <FontAwesomeIcon icon={faHeartLine}/>
                    </button>
                }
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
