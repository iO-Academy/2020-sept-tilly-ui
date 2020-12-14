import React from 'react';
import Button from "../../Button";


class SignUp extends React.Component {

    render() {
        return (

            <div id="logup">

                <img src="Images/tilly1.png" alt="tilly logo"/>

                <h5>
                    today i learned lots... yay!
                </h5>

                <h2 className="logup-title">
                    create an account
                </h2>

                <div id="logup-form">
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="username">
                            username
                        </label>
                        <input id="username" className="logup-input" type="text" required/>
                    </div>
                    <div className="logup-row requirements fade-text x-small">
                        required, only letters &amp;amp; numbers
                    </div>
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="email">
                            email
                        </label>
                        <input id="email" className="logup-input" type="text" required/>
                    </div>
                    <div className="logup-row requirements fade-text x-small">
                        required
                    </div>
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="password">password</label>
                        <input id="password" className="logup-input" type="password" required/>
                    </div>
                    <div className="logup-row requirements fade-text x-small">
                        required, min. 6 characters
                    </div>
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="about-me">
                            about me
                        </label>
                        <textarea id="about-me" className="logup-input"></textarea>
                    </div>
                    <div className="logup-row check-length requirements fade-text x-small">
                        <span className="text-length">
                            0
                        </span>
                        <span>/500</span>
                    </div>
                </div>

                <Button name="sign up" onClick={this.props.onHandleSwitch}/>

                <div className="switch-logup">
                    <p className="small">
                        already have an account?
                    </p>
                    <p>
                        <a onClick={this.props.onHandleSwitch}>log in</a>
                    </p>
                </div>

            </div>

        );
    }
}


export default SignUp;