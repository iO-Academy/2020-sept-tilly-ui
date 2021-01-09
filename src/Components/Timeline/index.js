import React from 'react';
import {Link} from "react-router-dom";
import './timeline.css';
import getTimeline from "../../Functions/getTimeline";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";

class Timeline extends React.Component {

    abortController = new AbortController();

    constructor(props) {
        super(props);
        this.state = {
            allLessons: [],
            visibleLessons: [],
            offset: 10
        }

        // this.getTimeline = getTimeline.bind(this);
        this.getLessons = getLessons.bind(this);
        this.getFollowing = getFollowing.bind(this);

        // if (this.props.currentUser.username) {
        //     this.getTimelineData();
        // }
        // if (this.props.currentUser) {
        //     console.log(this.props.currentUser)
        //     this.getTimeline(this.props.currentUser.username, this.abortController);
        // }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (this.props.currentUser.username) {
            this.getTimelineData();
        }
        this.setState({
            visibleLessons: this.state.allLessons.slice(0, this.state.offset)
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            if (this.props.currentUser.username) {
                // this.getTimeline(this.props.currentUser.username, this.abortController);
                this.getTimelineData();
            }
            // if (prevState !== this.state) {
            //     console.log('yay')
                this.setState({
                    visibleLessons: this.state.allLessons.slice(0, this.state.offset)
                });
            // }
        }
    }

    getTimelineData = () => {
        let allLessons = [];

        if (this.props.currentUser) {
            this.getLessons(this.props.currentUser.username, this.abortController)
                .then(lessons => {
                    allLessons = allLessons.concat(lessons)
                    return this.getFollowing(this.props.currentUser.username, this.abortController)
                })
                .then(data => {
                    return Promise.all(
                        data.data.username.following.map(user => {
                            return this.getLessons(user.username, this.abortController)
                                // .then(lessons => {
                                //     return allLessons.concat(lessons)
                                // })
                        })
                    )
                })
                .then(data => {
                    data.forEach(lessons => {
                        allLessons = allLessons.concat(lessons)
                    })
                    return allLessons
                })
                .then(data => {
                    data.sort((a, b) => {
                            if (a.id > b.id) {
                                return -1;
                            }
                            if (a.id < b.id) {
                                return 1;
                            }
                            return 0;
                        });
                    this.setState({
                        allLessons: data,
                        visibleLessons: data.slice(0, this.state.offset)
                    });
                })
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
            this.setState({
                offset: this.state.offset + 5
            })
            this.setState({
                visibleLessons: this.state.allLessons.slice(0, this.state.offset)
            })
        }
    }


    render() {
        return (
            <section id="timeline" className="primary">
                <h3>
                    timeline
                </h3>
                {this.state.visibleLessons.map((lesson, i) =>
                    <div key={'lesson' + i} className="lesson">
                        <span className="small">
                            <Link to={"/" + lesson.username}>
                                {lesson.username}
                            </Link> learned,
                        </span>
                        <span className="fade-text small">
                            on {lesson.date}
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