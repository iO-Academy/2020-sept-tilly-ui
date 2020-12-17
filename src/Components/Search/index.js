import React from 'react';
import Button from "../Button";
import decoder from "../../Functions/decoder";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        const query = `
            query {
                search(searchTerm: "${this.state.searchTerm}") {
                    username
                }
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
                console.log(data)
            });
    }

    render() {
        return (
            <>
            <form id="logup-form">
                <div className="logup-row">
                    <label
                        className="logup-label"
                        htmlFor="searchTerm">
                        search
                    </label>
                    <input
                        id="searchTerm"
                        className="logup-input"
                        type="text"
                        required
                        name="searchTerm"
                        value={this.state.searchTerm}
                        onChange={this.handleInput}
                    />
                </div>
                <div
                    className="logup-row requirements fade-text x-small">
                    search by username or description
                </div>
            </form>
            <Button
                name="search"
                onHandleClick={this.handleSubmit}
            />
        </>
        );
    }
}

export default Search;