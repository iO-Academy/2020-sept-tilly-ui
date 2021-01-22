import React from "react";
import Lesson from "../Lesson";
import getSingleLesson from "../../Functions/getSingleLesson";

class SingleLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: {
                lesson: '',
                date: '',
                name: '',
                username: '',
            },
            lessonNotFound: false
        }
        this.getSingleLesson = getSingleLesson.bind(this);
    }

    abortController = new AbortController();

    componentDidMount = () => {
        this.getSingleLessonData();
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps !== this.props) {
            this.getSingleLessonData();
        }
    }

    componentWillUnmount = () => {
        this.abortController.abort();
    }

    getSingleLessonData = () => {
        this.getSingleLesson(this.props.match.params.lessonId, this.abortController)
            .then(data => {
                if (data === undefined) {
                    this.setState({
                        lessonNotFound: true
                    });
                } else {
                    this.setState({
                        lesson: data
                    });
                }
            });
    }

    render() {
        return (
            this.state.lessonNotFound ?
                <h2 className="userNotFound">lesson not found</h2>
                :
                <section>
                    <Lesson
                        lesson={this.state.lesson}
                        name={this.state.lesson.name}
                        currentUser={this.props.currentUser}
                        getLikedLessons={this.props.getLikedLessons}
                        getLessonsAgain={this.getLessonData}
                        profile={false}
                    />
                </section>
        );
    }
}

export default SingleLesson;
