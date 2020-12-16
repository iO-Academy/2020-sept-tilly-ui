import React from 'react';

class Timeline extends React.Component {

    render() {
        return (

            <section id="my-lessons" className="primary">
                <h3>
                    timeline
                </h3>
                {this.props.lessons.map((lesson, i) =>
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

export default Timeline;