import React from 'react';
import './profile.css';
import decoder from "../../Functions/decoder";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }

    componentDidMount() {
        this.setState({
            lessons: this.props.lessons
        });
    }

    render() {
        return (
            <section id="my-lessons" className="primary">
                <h3>
                    my lessons
                </h3>
                {this.state.lessons.map((lesson, i) =>
                    <div key={'lesson' + i} className="lesson">
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