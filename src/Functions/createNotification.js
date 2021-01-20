import decoder from "./decoder";

export default function createNotification(sender, recipient, type, token, lesson) {
    if (lesson === undefined) {
        const query = `
            mutation {
                addNotification(
                    sender: "${sender}",
                    recipient: "${recipient}",
                    type: "${type}",
                    token: "${token}"
                )
            }
        `;
        return fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
    } else {
        const query = `
                mutation {
                    addNotification(
                        sender: "${sender}",
                        recipient: "${recipient}",
                        type: "${type}",
                        lesson: "${lesson}",
                        token: "${token}"
                    )
                }
            `;
        return fetch('http://localhost:4002/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({query})
        })
    }
}