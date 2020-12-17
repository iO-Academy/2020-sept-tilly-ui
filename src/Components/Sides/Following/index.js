import React from 'react';
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
        setTimeout(() => this.setState({following: this.props.following}), 200);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.following !== this.props.following) {
            this.setState({following: this.props.following});
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
                            <a>
                                {following.username}
                            </a>
                        </p>
                        <p className="fade-text x-small">
                            {following.username} but actually description maybe,
                            see how it looks with this much text, writing words,
                            maybe too much?
                        </p>
                    </div>
                    <div>
                        <Button
                            className="follow unfollow"
                            name={following.id}
                            onClick={this.unfollow}>
                            +
                        </Button>
                    </div>
                </div>
                )}
            </section>
        );
    }
}

export default Following;