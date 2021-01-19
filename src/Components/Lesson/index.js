import React from 'react';
import {Link} from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './lesson.css';
import '../Button/buttons.css';

export default function Lesson(props) {
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
            {props.loggedIn &&
            <Button
                className="delete"
                name="+"
            />
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
