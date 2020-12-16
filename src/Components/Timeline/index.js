import React from 'react';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            following: []
        }
    }

    componentDidMount() {
        if (this.props.username !== '') {
            this.getFollowing();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.following !== this.props.following) {
            this.getFollowing();
        }
    }

    getFollowing = () => {
        const query = `query {
            username(username: "${this.props.username}") {
                following {
                    username,
                    lessons {
                        id,
                        lesson
                    }
                }
            }
        }`
        fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(r => r.json())
            .then(data => {
                console.log(data);
                let lessons = [];
                data.data.username.following.forEach(following => {
                    const date = following.lessons[0].id.toString().substring(0,8)
                    const convert = new Date(parseInt(date, 16) * 1000)
                    const newDate =convert.toLocaleDateString("EN-GB")
                    lessons.unshift({lesson: following.lessons[0].lesson, date: newDate})
                })
                lessons.unshift(this.props.lessons[0])
                this.setState({
                    following: data.data.username.following,
                    lessons: lessons
                });
            })

    }

    render() {
        return (

            <section id="my-lessons" className="primary">
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