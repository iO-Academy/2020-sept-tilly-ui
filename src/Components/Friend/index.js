import React from 'react';
import Following from '../Sides/Following';
import '../Profile/profile.css'
import getUser from "../../Functions/getUser";

class Friend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: []
        }
        this.getUser = getUser.bind(this);
    }

    componentDidMount() {
        this.getUser(this.props.match.params.username);
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    render() {
        return (
            <div>
                <section id="my-lessons" className="primary">
                    <h3>
                        {this.state.username}'s lessons
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
                <Following
                    following={this.state.following}
                />
            </div>
        );
    }
}

export default Friend;