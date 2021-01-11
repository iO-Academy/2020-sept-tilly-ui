import React from 'react';
import Button from "../Button";
import './create.css';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            length: 0,
            tooLong: false,
            tooShort: true
        };
    }

    handleInput = (event) => {
        const text = event.target.value;
        const length = text.length;
        this.setState({
            text: text,
            length: length,
            tooLong: (length > 255),
            tooShort: (length < 1)
        });
    }

    createLesson = () => {
        console.log(this.state.text)
        console.log(this.props.id)
        this.props.onCreateLesson(this.state.text);
        const token = localStorage.getItem('tillyToken');
        const query = `mutation {
            addTil(
                lesson: "${this.state.text}",
                userId: "${this.props.id}",
                token: "${token}"
            ){
                lesson     
            }
        }`;
        fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
            .then(r => {
                this.setState({
                    text: '',
                    length: 0
                })
            })
    }

    render() {
        return (
            this.props.currentUser.loggedIn && this.props.currentUser.username === this.props.username &&
                <section id="create" className="primary">
                    <h4>
                        have you learned something new today?
                    </h4>
                    <textarea
                        value={this.state.text}
                        name="text"
                        minLength='1'
                        maxLength='255'
                        onChange={this.handleInput}>
                    </textarea>
                    <div className="check-length small">
                    <span className="text-length">
                        {this.state.length}
                    </span>
                        <span className="fade-text">
                        /255
                    </span>
                    </div>
                    <Button
                        disabled={this.state.tooLong || this.state.tooShort}
                        onHandleClick={this.createLesson}
                        className="generic"
                        name="create"
                    />
                </section>
        );
    }
}


export default Create;