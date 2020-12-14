import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/">timeline</Link>
                <Link to={"/" + this.props.username}>profile</Link>
            </nav>
        );
    }
}


export default Header;