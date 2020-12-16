import React from 'react';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: this.props.allLessons,
            visibleLessons: [],
            offset: 10,
            following: []
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            visibleLessons : this.state.lessons.slice(0, this.state.offset)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps != this.props) {
            this.setState({
                visibleLessons : this.state.lessons.slice(0, this.state.offset)
            })
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
            this.setState({
                offset : this.state.offset + 5
            })
            this.setState({
                visibleLessons : this.state.lessons.slice(0, this.state.offset)
            })
        }
    }

    render() {
        return (
            <section id="my-lessons" className="primary">
                <h3>
                    timeline
                </h3>
                {this.state.visibleLessons.map((lesson, i) =>
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