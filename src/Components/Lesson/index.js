import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './lesson.css';
import '../Button/buttons.css';

export default function Lesson(props) {
    const [options, openOptions] = useState(false);
    function closeOptions(event) {
        if (event.target.classList.contains('lesson-options-modal-bg')) openOptions(!options);
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
            {props.currentUser.loggedIn && (props.lesson.username === props.currentUser.username) &&
                (options ?
                    <div className="lesson-options x-small">
                        <div
                            className="lesson-options-modal-bg"
                            onClick={closeOptions}>
                        </div>
                        <div
                            className="lesson-options-list"
                            onClick={() => console.log('doing this will delete it')}>
                            Delete
                            <FontAwesomeIcon
                                icon={faTrash}
                            />
                        </div>
                    </div>
                    :
                    <Button
                        className="lesson-options delete"
                        name="..."
                        onHandleClick={() => openOptions(!options)}
                    />
                )
            }
            <p>
                {props.lesson.lesson}
            </p>
            <span className="actionBar">
                <button>
                    <FontAwesomeIcon icon={faShareAlt} />
                </button>
                <button>
                    <FontAwesomeIcon icon={faHeartLine} />
                </button>
            </span>
        </div>
    );
}
