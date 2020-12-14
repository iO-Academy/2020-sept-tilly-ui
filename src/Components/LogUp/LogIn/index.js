import React from 'react';
import Button from "../../Button";


class LogIn extends React.Component {

    render() {
        return (
            <div id="logup">

                <img src="Images/tilly1.png" alt="tilly logo"/>

                <h5>
                    today i learned lots... yay!
                </h5>

                <h2 className="logup-title">
                    log in
                </h2>

                <div id="logup-form">
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="username">
                            username
                        </label>
                        <input id="username" className="logup-input" type="text" required/>
                    </div>
                    <div className="logup-row">
                        <label className="logup-label" htmlFor="password">password</label>
                        <input id="password" className="logup-input" type="password" required/>
                    </div>
                </div>

                <Button name="log in" />

                <div className="switch-logup">
                    <p className="small">
                        don't have an account?
                    </p>
                    <p>
                        <a onClick={this.props.onHandleSwitch}>create one</a>
                    </p>
                </div>
            </div>
        );
    }
}


export default LogIn;