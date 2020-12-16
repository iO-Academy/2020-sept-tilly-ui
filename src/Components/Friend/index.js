import React from 'react';
import '../Profile/profile.css'

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
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        console.log(this.props)
        const query = `query {
              username (username: "${this.props.match.params.username}") {
                username,
                name,
                email,
                description,
                following {
                  name
                }
                lessons {
                  id,
                  lesson
                }
              }
            }`;
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
                data.data.username.lessons.forEach(lesson => {
                    const date = lesson.id.toString().substring(0, 8);
                    const convert = new Date(parseInt(date, 16) * 1000);
                    const newDate = convert.toLocaleDateString("EN-GB");
                    lessons.unshift({lesson: lesson.lesson, date: newDate});
                });
                this.setState({
                    username: data.data.username.username,
                    name: data.data.username.name,
                    email: data.data.username.email,
                    description: data.data.username.description,
                    lessons: lessons,
                    following: data.data.username.following
                });
            });
        setTimeout(() => console.log(this.state), 1000);
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
            </div>
        );
    }
}

export default Friend;