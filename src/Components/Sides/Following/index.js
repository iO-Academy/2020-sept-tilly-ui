import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button";
import '../sides.css';

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: []
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            following: this.props.following
        }), 200);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.following !== this.props.following) {
            this.setState({
                following: this.props.following
            });
        }
    }

    render() {
        return (
            <section className="secondary secondary-right">
                <h4>
                    following
                </h4>
                {this.state.following.map(following =>
                <div
                    className="me-follow">
                    <div>
                        <p>
                            <Link to={"/" + following.username}>
                                {following.username}
                            </Link>
                        </p>
                        <p className="fade-text x-small">
                            {following.description}
                        </p>
                    </div>
                    {this.props.loggedIn &&
                    <div>
                        {this.props.myUsername !== following.username &&
                        !this.props.myFollowing.find(o => o.username === following.username) &&
                        <Button
                            className="follow"
                            onHandleClick={this.props.onFollow}
                            value={following.id}
                            name="+"
                        />
                        }
                        {this.props.myFollowing.find(o => o.username === following.username) &&
                        <Button
                            className="follow unfollow unfollow-rotate"
                            onHandleClick={this.props.onUnfollow}
                            value={following.id}
                            name="+"
                        />
                        }
                    </div>
                    }
                </div>
                )}
            </section>
        );
    }
}

export default Following;