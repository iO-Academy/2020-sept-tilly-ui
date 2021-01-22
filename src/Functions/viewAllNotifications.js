export default function viewAllNotifications(id, token, abortController) {
    const query = `mutation {
        markAllAsRead (
            user: "${id}",
            token: "${token}"
        )
    }`
    return fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        signal: abortController.signal
    })
}