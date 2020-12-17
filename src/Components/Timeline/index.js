import React from 'react';
import './timeline.css';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            following: [],
            offset: 10
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            lessons: this.props.allLessons.slice(0, this.state.offset)
        });
        setTimeout(()=>console.log(this.props.lessons));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                lessons: this.props.allLessons.slice(0, this.state.offset)
            });
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        const signal = controller.signal;
        controller.abort();
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
            this.setState({
                offset: this.state.offset + 5
            })
            this.setState({
                lessons: this.props.allLessons.slice(0, this.state.offset)
            })
        }
    }

    render() {
        return (
            <section id="timeline" className="primary">
                <h3>
                    timeline
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

export default Timeline;