export default function getLikedLessons(username, abortController) {
    const query = `
        query {
            username (username: "${username}") {
                likedLessons {
                    id,
                    user {
                        id
                    },
                    lesson
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