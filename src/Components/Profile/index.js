import React from 'react';
import Following from "../Sides/Following";
import Create from "../Create";
import Bio from "../Sides/Bio";
import './profile.css';

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
            token: ''
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.username,
            description: this.props.description,
            lessons: this.props.lessons,
            following: this.props.following
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                id: this.props.id,
                username: this.props.username,
                description: this.props.description,
                lessons: this.props.lessons,
                following: this.props.following
            });
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        const signal = controller.signal;
        controller.abort();
    }

    unfollow = (event) => {
        const token = localStorage.getItem('tillyToken');
        console.log(event.target.value);
        console.log(token);
        console.log(this.state);
        const query = `mutation {
            unfollow(
                followee: "${event.target.value}",
                follower: "${this.state.id}",
                token: "${token}"
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
                this.props.onGetData();
            });
    }

    render() {
        return (
            <div>
                <Bio
                    username={this.state.username}
                    description={this.state.description}
                />
                <Create
                    id={this.props.id}
                    onCreateLesson={this.props.onAddLesson}
                />
                <section id="my-lessons" className="primary">
                    <h3>
                        my lessons
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
                    onUnfollow={this.unfollow}
                    myUsername={this.state.myUsername}
                    myFollowing={this.state.following}
                    following={this.state.following}
                />
            </div>
        );
    }
}

export default Profile;
