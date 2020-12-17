import React from 'react';
import Following from "../../Sides/Following";
import Bio from "../../Sides/Bio";
import getUserData from "../../../Functions/getUserData";
import decoder from "../../../Functions/decoder";
import getDate from "../../../Functions/getDate";
import Button from "../../Button";
import '../profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: [],
            current: true,
            myId: '',
            myUsername: '',
            myFollowing: [],
        }
        this.getUserData = getUserData.bind(this);
        this.decoder = decoder.bind(this);
    }

    componentDidMount() {
        this.getUser(this.props.match.params.username);
        this.getCurrentUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getUser(this.props.match.params.username);
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        const signal = controller.signal;
        controller.abort();
    }

    getCurrentUser = () => {
        if (localStorage.getItem('tillyToken')) {
            const token = localStorage.getItem('tillyToken');
            const decoded = this.decoder(token);
            token && this.setState({
                loggedIn: true,
                myId: decoded.id,
                myUsername: decoded.username,
                token: token
            });
            const query = `query {
              user (id: "${decoded.id}") {
                username,
                following {
                  name,
                  username,
                  description,
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
                        this.setState({
                            myFollowing: data.data.user.following
                        });
                    });
            setTimeout(() => console.log(this.state.username), 500);
            }
    }

    getUser = (name) => {
        const query = `query {
          username (username: "${name}") {
            id,
            username,
            name,
            description,
            following {
              id,
              name,
              username,
              description,
              lessons {
                id,
                lesson
              }
            },
            lessons {
              id,
              lesson
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
                let lessons = [];
                data.data.username.lessons.forEach(lesson => {
                    const newDate = getDate(lesson.id);
                    lessons.unshift({id: lesson.id, lesson: lesson.lesson, date: newDate});
                });
                this.setState({
                    id: data.data.username.id,
                    username: data.data.username.username,
                    name: data.data.username.name,
                    description: data.data.username.description,
                    lessons: lessons,
                    following: data.data.username.following
                });
            });
    }

    follow = (event) => {
        console.log(event.target.value)
        const query = `mutation {
            follow(
                followee: "${event.target.value}",
                follower: "${this.state.myId}",
                token: "${this.state.token}"
            )
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
                this.getCurrentUser();
            });
    }

    unfollow = (event) => {
        console.log(event.target.value)
        const query = `mutation {
            unfollow(
                followee: "${event.target.value}",
                follower: "${this.state.myId}",
                token: "${this.state.token}"
            )
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
                this.getCurrentUser();
            });
    }

    render() {
        return (
            <div>
                <Bio
                    username={this.state.username}
                    description={this.state.description}
                />
                <section id="my-lessons" className="primary">
                    {!this.state.myFollowing.find(o => o.username === this.state.username) &&
                        <Button
                            onHandleClick={this.follow}
                            value={this.state.id}
                            className="generic"
                            name="follow"
                        />
                    }
                    {this.state.myFollowing.find(o => o.username === this.state.username) &&
                        <Button
                            onHandleClick={this.unfollow}
                            value={this.state.id}
                            className="generic unfollow"
                            name="unfollow"
                        />
                    }
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
                    onFollow={this.follow}
                    onUnfollow={this.unfollow}
                    myUsername={this.state.myUsername}
                    myFollowing={this.state.myFollowing}
                    following={this.state.following}
                />
            </div>
        );
    }
}

export default Profile;
