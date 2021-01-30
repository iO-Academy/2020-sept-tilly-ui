import React from "react";
import Button from "../../Button";
import {Link} from "react-router-dom";
import "../logup.css";
import decoder from "../../../Functions/decoder";
import UserForm from "../../UserForm";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.decoder = decoder.bind(this);
    }

    handleSubmit = (name, username, email, password, description) => {
        const query = `mutation {
            addUser(
                name: "${name}",
                username: "${username}"
                email: "${email}",
                password: "${password}",
                description: "${description}",
            )
        }`;
        fetch("http://localhost:4002/graphql", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({query})
        })
            .then(r => r.json())
            .then(data => {
                const token = data.data.addUser;
                const decoded = this.decoder(token);
                // this.setState({id: decoded.id});
                this.props.onCreateUser(name, username, email, password, description, token, decoded);
            });
    }

    render() {
        return (
            <div
                id="logup">
                <h2
                    className="logup-title">
                    create an account
                </h2>
                <div
                    className="switch-logup">
                    <p
                        className="small">
                        already have an account? <Link to="/login">log in</Link>
                    </p>
                </div>
                <UserForm handleSubmit={this.handleSubmit} name={"sign up"}/>
            </div>
        );
    }
}

export default SignUp;
