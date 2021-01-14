import React from "react";
import Button from "../../Button";
import {Link} from "react-router-dom";
import "../logup.css";
import decoder from "../../../Functions/decoder";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            username: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            description: "",
            validUsername: null,
            validName: null,
            validPassword: false,
            passwordConfirmed: false,
            validEmail: null,
            usernameAvailable: null,
            emailAvailable: null
        }
        this.checkUsername = this.checkUsername.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.decoder = decoder.bind(this);
    }

    handleInput = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        await this.setState({
            [name]: value
        });
        this.validate([event.target.name])
        event.target.name === "username" && this.state.validUsername && await this.checkUsername(event);
        event.target.name === "email" && this.state.validEmail && await this.checkEmail(event);
    }

    handleSubmit = () => {
        if (
            this.state.validName &&
            this.state.validPassword &&
            this.state.passwordConfirmed &&
            this.state.usernameAvailable &&
            this.state.emailAvailable
        ) {
            const query = `mutation {
                addUser(
                    name: "${this.state.name}",
                    username: "${this.state.username}"
                    email: "${this.state.email}",
                    password: "${this.state.password}",
                    description: "${this.state.description}",
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
                    this.setState({id: decoded.id});
                    this.props.onCreateUser(this.state);
                });
        }
    }

    validate = (fields) => {
        const usernamePattern = new RegExp(/^[a-zA-Z0-9]{3,20}$/);
        const namePattern = new RegExp(/^[a-zA-Z0-9]{3,20}$/);
        const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/);
        const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

        fields.forEach(field => {
            switch (field) {
                case "username":
                    this.state.username.length < 3 ?
                        this.setState({validUsername: null}) :
                        this.setState({validUsername: usernamePattern.test(this.state.username)});
                        break;
                case "name":
                    this.state.name.length < 3 ?
                        this.setState({validName: null}) :
                        this.setState({validName: this.state.name && namePattern.test(this.state.name)})
                    break;
                case "email":
                    this.setState({validEmail: this.state.email && emailPattern.test(this.state.email)});
                    break;
                case "password":
                    this.setState({validPassword: this.state.password && passwordPattern.test(this.state.password)});
                    this.setState({passwordConfirmed: this.state.password === this.state.confirmPassword});
                    break;
                case "confirmPassword":
                    this.state.confirmPassword = "" ?
                        this.setState({passwordConfirmed: null}) :
                        this.setState({validPassword: this.state.password && passwordPattern.test(this.state.password)});
                        this.setState({passwordConfirmed: this.state.password && this.state.password === this.state.confirmPassword});
            }
        })
    }

    async checkUsername(event) {
        const query = `query {
            availableUsername (username: "${event.target.value}") 
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
                let available = {...this.state};
                available.usernameAvailable = !!data.data.availableUsername;
                this.setState({...available});
            });
    }

    async checkEmail(event) {
        const query = `query {
            availableEmail (email: "${event.target.value}") 
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
                let available = {...this.state};
                available.emailAvailable = !!data.data.availableEmail;
                this.setState({...available});
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
                <form id="logup-form">
                    {/*Username*/}
                    <div className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="username">
                            username
                        </label>
                        <input
                            id="username"
                            className="logup-input"
                            type="text"
                            required
                            maxLength="20"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {!this.state.validUsername ?
                                <div className="input pending">
                                    -
                                </div> :
                                this.state.usernameAvailable ?
                                    <div className="input valid">
                                    &#10003;
                                    </div> :
                                    <div className="input invalid">
                                        &#10007;
                                    </div>

                            }
                        </div>
                    </div>
                    {this.state.validUsername && !this.state.usernameAvailable ?
                        <div
                            className="logup-row requirements warn-text x-small">
                            username already taken
                        </div> :
                        <div
                            className="logup-row requirements fade-text x-small">
                            required, 3-20 letters or numbers
                        </div>
                    }
                    {/*Name*/}
                    <div className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="name">
                            name
                        </label>
                        <input
                            id="name"
                            className="logup-input"
                            type="text"
                            required
                            maxLength="20"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {!this.state.validName ?
                                <div className="input pending">
                                    -
                                </div> :
                                <div className="input valid">
                                    &#10003;
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, 3-20 letters
                    </div>
                    {/*Email*/}
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="email">
                            email
                        </label>
                        <input
                            id="email"
                            className="logup-input"
                            type="email"
                            required
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {!this.state.validEmail ?
                                <div className="input pending">
                                    -
                                </div> :
                                this.state.emailAvailable ?
                                    <div className="input valid">
                                        &#10003;
                                    </div> :
                                    <div className="input invalid">
                                        &#10007;
                                    </div>

                            }
                        </div>
                    </div>
                    {this.state.validEmail && !this.state.emailAvailable ?
                        <div
                            className="logup-row requirements warn-text x-small">
                            email already registered
                        </div> :
                        <div
                            className="logup-row requirements fade-text x-small">
                            required
                        </div>
                    }
                    {/*Password*/}
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="password">password
                        </label>
                        <input
                            id="password"
                            className="logup-input"
                            type="password"
                            required
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {!this.state.validPassword ?
                                <div className="input pending">
                                    -
                                </div> :
                                <div className="input valid">
                                    &#10003;
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, min. 5 characters &amp; 1 number
                    </div>
                    {/*Confirm password*/}
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="password">confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            className="logup-input"
                            type="password"
                            required
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {!this.state.passwordConfirmed ?
                                <div className="input pending">
                                    -
                                </div> :
                                <div className="input valid">
                                    &#10003;
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
                    {/*Description*/}
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="about-me">
                            about me
                        </label>
                        <textarea
                            id="about-me"
                            maxLength="500"
                            className="logup-input"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInput}>
                        </textarea>
                        <div className="validity-check"></div>
                    </div>
                    <div
                        className="logup-row check-length requirements fade-text x-small">
                        <span
                            className="text-length">
                            {this.state.description.length}
                        </span>
                        <span>
                            /500
                        </span>
                    </div>
                </form>
                <Button
                    disabled={
                        !this.state.validName ||
                        !this.state.validPassword ||
                        !this.state.passwordConfirmed ||
                        !this.state.usernameAvailable ||
                        !this.state.emailAvailable
                    }
                    className="logupButton generic"
                    name="sign up"
                    onHandleClick={this.handleSubmit}
                />
            </div>
        );
    }
}

export default SignUp;
