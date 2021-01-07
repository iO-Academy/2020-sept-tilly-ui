import React from 'react';
import Button from "../../Button";
import {Redirect, Link} from "react-router-dom";
import decoder from "../../../Functions/decoder";
import '../logup.css';


class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            incorrect: false,
            nonExistent: false,
            id: '',
            username: '',
            password: '',
            redirect: false
        }
        this.decoder = decoder.bind(this);
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
            incorrect: false,
            nonExistent: false
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const query = `mutation {
            login (username: "${this.state.username}", password: "${this.state.password}")
        }`;
        try {
            fetch('http://localhost:4002/graphql', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(r => r.json())
                .then(data => {
                    if (data.data.login === "Login failed") {
                        this.setState({incorrect: true});
                    } else if (data.data.login === null) {
                        this.setState({nonExistent: true});
                    } else {
                        const token = data.data.login;
                        const decoded = this.decoder(token);
                        this.setState({
                            id: decoded.id,
                            incorrect: false,
                            redirect: true
                        });
                        this.props.onLoginSuccess(this.state.id);
                    }
                });
        } catch(err){
            console.log(err);
        }
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                id="logup">
                <h5>
                    today i learned lots... yay!
                </h5>
                <h2
                    className="logup-title">
                    log in
                </h2>
                <div
                    className="switch-logup">
                    <p
                        className="small">
                        don't have an account? <Link to="/">create one</Link>
                        {this.state.redirect && <Redirect to='/' />}
                    </p>
                </div>
                <div
                    id="logup-form">
                    <div
                        className="logup-row small">
                        {this.state.incorrect &&
                        'The details you entered are incorrect. Try again!'}
                        {this.state.nonExistent &&
                        'Cannot find user. Try again!'}
                    </div>
                    {/*username*/}
                    <div
                        className="logup-row">
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
                        <div className="validity-check"></div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
                    {/*password*/}
                    <div
                        className="logup-row">
                        <label
                            className="logup-label"
                            htmlFor="password">
                            password
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
                        <div className="validity-check"></div>
                    </div>
                    <div
                        className="logup-row requirements fade-text x-small">
                        required
                    </div>
                </div>
                <Button
                    className="generic"
                    name="log in"
                />
            </form>
        );
    }
}


export default LogIn;
