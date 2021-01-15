import React from 'react';
import {Link} from "react-router-dom";
import './lesson.css';

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
            <p>
                {props.lesson.lesson}
            </p>
        </div>
    );
}
