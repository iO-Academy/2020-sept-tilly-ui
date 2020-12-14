import React from 'react';
import Button from "../../Button";
import {Link} from "react-router-dom";
import '../logup.css';


class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValid: {
                username: false,
                password: false,
            }}
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    handleSubmit = () => {
        //If username/password valid - loggedIn = true
        if(
            this.state.isValid.password &&
            this.state.isValid.username
        ){

        }
    }

    validate() {
        // let input = this.state;

        //
    }

    render() {
        return (
            <div
                id="logup">

                <img
                    src="Images/tilly1.png"
                    alt="tilly logo"/>

                <h5>
                    today i learned lots... yay!
                </h5>

                <h2
                    className="logup-title">
                    log in
                </h2>

                <div
                    id="logup-form">
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
                    </div>
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
                    </div>
                </div>

                <Button
                    name="log in"
                    onClick={this.handleSubmit}/>

                <div
                    className="switch-logup">
                    <p
                        className="small">
                        don't have an account?
                    </p>
                    <p>
                        <Link to="/">create one</Link>
                    </p>
                </div>
            </div>
        );
    }
}


export default LogIn;