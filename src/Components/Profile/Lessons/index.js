import React from 'react';

export default function Lessons(props) {
    return (
        <section id="my-lessons" className="primary">
            {props.currentUser.username === props.username ?
                <h3>my lessons</h3>
                :
                <h3>{props.username}'s lessons</h3>
            }
            {props.lessons.map((lesson, i) =>
                <div key={"lesson" + i} className="lesson">
                                <span className="fade-text small">
                                    {lesson.date}
                                </span>
                    <p>
                        {lesson.lesson}
                    </p>
                </div>
            )}
        </section>
    );
}
