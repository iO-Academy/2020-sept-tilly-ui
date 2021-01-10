export default function followFetch(query, abortController) {
    return fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        signal: abortController.signal
    })
        .then(r => r.json())
        // .then(data => {
        //     this.getFollowing(this.props.username, this.abortController);
        //     this.getFollowing(this.props.myUsername, this.abortController);
        // });
}