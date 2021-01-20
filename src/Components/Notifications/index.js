import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLine } from '@fortawesome/free-regular-svg-icons';
import './lesson.css';
import '../Button/buttons.css';
import Lesson from "../Lesson";

export default function Notifications(props) {
    const [options, openOptions] = useState(false);
    const [share, openShare] = useState(false);


    return (
        <section id="my-lessons">
            {this.props.currentUser.username === this.props.match.params.username ?
                <h3>my lessons</h3>
                :
                <h3>{this.state.name}'s lessons</h3>
            }
            {this.state.lessons.map((lesson, i) =>
                <Lesson
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