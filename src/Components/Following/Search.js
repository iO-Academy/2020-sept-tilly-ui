import React from "react";
import search from "../../Functions/search";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    handleInput = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }



    render() {
        return
    }

}

export default Search;