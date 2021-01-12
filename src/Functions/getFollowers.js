export default function getFollowers(username, abortController) {
    const query = `
        query {
            username (username: "${username}") {
                followers {
                    id,
                    name,
                    username,
                    description
                }
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
}