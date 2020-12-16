import React from 'react';

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        return (

            <section className="secondary secondary-right">

                <h4>you're following...</h4>


                <div className="me-follow">
                    <div>
                        <span className="x-small">
                            6 lessons
                        </span>
                        <p>
                            <a>
                                happyhippy444
                            </a>
                        </p>
                    </div>
                    <button className="follow unfollow">
                        +
                    </button>
                </div>

            </section>
        );
    }
}

export default Timeline;