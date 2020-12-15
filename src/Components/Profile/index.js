import React from 'react';
import './profile.css';

class Profile extends React.Component {
    render() {
        return (
            <section id="my-lessons" className="primary">
                <h3>
                    my lessons
                </h3>
                {this.props.lessons.map(lesson =>
                    <div className="lesson">
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
}

export default Profile;