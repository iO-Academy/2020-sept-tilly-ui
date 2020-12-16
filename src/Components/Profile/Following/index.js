import React from 'react';

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }

    render() {
        return (
            <section className="secondary secondary-right">
                <h4>
                    following
                </h4>
                <div
                    className="me-follow">
                    <div>
                        <span
                            className="lessons-length x-small">
                            {this.state.lessons.length} lessons
                        </span>
                        <p>
                            <a>
                                happyhippy444
                            </a>
                        </p>
                    </div>
                    <button className="follow unfollow">
                        +
                    </button>
                </div>

            </section>
        );
    }
}

export default Timeline;