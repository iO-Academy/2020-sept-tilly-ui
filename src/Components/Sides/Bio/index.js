import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button";
import '../sides.css';

class Bio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: []
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <section className="secondary secondary-left">
                <h4>
                    {this.props.username}
                </h4>
                <p>
                    {this.props.description}
                </p>
            </section>
        );
    }
}

export default Bio;