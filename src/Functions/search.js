export default function search(searchTerm, abortController) {
    const query = `
        query {
            search (searchTerm: "${searchTerm}") {
                id,
                name,
                username
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