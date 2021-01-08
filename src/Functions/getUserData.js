export default function getUserData(username, abortController) {
    const query = `query {
          username (username: "${username}") {
            id,
            username,
            name,
            email,
            description
          }
        }`
    fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        signal: abortController.signal
    })
        .then(r => r.json())
        .then(data => {
            if (data.data.username === null) {
                this.setState({notFound: true});
                return;
            }
            this.setState({
                id: data.data.username.id,
                username: data.data.username.username,
                name: data.data.username.name,
                email: data.data.username.email,
                description: data.data.username.description
            });
        });
}