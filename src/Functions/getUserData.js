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
    return fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        signal: abortController.signal
    })
        .then(r => r.json())
        .then(data => {
            return data;
        });
}
