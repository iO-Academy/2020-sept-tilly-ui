import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Button from "../Button";
import './logup.css';


class LogUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {SignUp: true}
    }

    handleSwitch = () => {
        this.setState(prevState => ({
            SignUp: !prevState.SignUp
        }));
    }


    render() {
        return (
            <div>
                {this.state.SignUp
                ?
                <SignUp onHandleSwitch={this.handleSwitch}/>
                :
                <LogIn onHandleSwitch={this.handleSwitch}/>}

            </div>
        );
    }
}


export default LogUp;