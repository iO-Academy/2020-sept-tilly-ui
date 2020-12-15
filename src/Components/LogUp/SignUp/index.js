import React from 'react';
import Button from "../../Button";
import {Link} from "react-router-dom";
import '../logup.css';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            name: '',
            email: '',
            password: '',
            description: '',
            isValid: {
                username: false,
                password: false,
                email: false
            },
            isAvailable: {
                username: null,
                email: null
            }
        }
        this.checkUsername = this.checkUsername.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        this.validate();
        this.state.isValid.username && this.checkUsername(event);
        this.state.isValid.email && this.checkEmail(event);
    }

    handleSubmit = () => {
        this.validate();
        if (
            this.state.isValid.email &&
            this.state.isValid.password &&
            this.state.isAvailable.username &&
            this.state.isAvailable.email
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
            fetch('http://localhost:4002/graphql', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(r => r.json())
                .then(data => {
                    const token = data.data.addUser;
                    const jwt = require('jsonwebtoken');
                    const decoded = jwt.verify(token, 'secret');
                    localStorage.setItem('tillyToken', token);
                    this.setState({id: decoded.id});
                    this.createUser(this.state);
                });
        }
    }

    createUser = (userInfo) => {
        this.props.onCreateUser(userInfo);
    }

    validate = () => {
        let input = {...this.state};
        if (typeof input["username"] !== "undefined") {
            const usernamePattern = new RegExp(/^(?=.{3,12}$)[a-zA-Z0-9]+/);
            input.isValid.username = usernamePattern.test(input["username"]);
        }
        if (typeof input["email"] !== "undefined") {
            const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/);
            input.isValid.email = emailPattern.test(input["email"]);
        }
        if (typeof input["password"] !== "undefined") {
            const passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
            input.isValid.password = passwordPattern.test(input["password"]);
        }
        this.setState({input});
    }

    async checkUsername(event) {
        const query = `query {
            availableUsername (username: "${event.target.value}") 
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
                console.log(this.state.username);
                    let available = {...this.state};
                    available.isAvailable.username = !!data.data.availableUsername;
                    this.setState({...available});
                }
            )
    }

    async checkEmail(event) {
        const query = `query {
            availableEmail (email: "${event.target.value}") 
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
                console.log(this.state.email);
                    let available = {...this.state};
                    available.isAvailable.email = !!data.data.availableEmail;
                    this.setState({...available});
                }
            )
    }

    render() {
        return (
            <div
                id="logup">

                <img
                    src="Images/tilly1.png" alt="tilly logo"/>

                <h5>
                    today i learned lots... yay!
                </h5>

                <h2
                    className="logup-title">
                    create an account
                </h2>

                <form id="logup-form">
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
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                            {this.state.isValid.username && this.state.isAvailable.username &&
                            <div className="valid-input">
                                &#10003;
                            </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, only letters &amp; numbers
                    </div>
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
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInput}
                        />
                        <div
                            className="validity-check">
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
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
                            {this.state.isValid.email && this.state.isAvailable.email &&
                            <div className="valid-input">
                                &#10003;
                            </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
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
                            {this.state.isValid.password &&
                            <div className="valid-input">
                                &#10003;
                            </div>
                            }
                        </div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required, min. 6 characters
                    </div>
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
                    name="sign up"
                    onHandleClick={this.handleSubmit}
                />
                <div
                    className="switch-logup">
                    <p
                        className="small">
                        already have an account?
                    </p>
                    <p>
                        <Link to="/login">
                            log in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignUp;
