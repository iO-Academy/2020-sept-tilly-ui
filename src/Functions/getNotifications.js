import getDate from "./getDate";

export default function getNotifications(username, abortController) {
    const query = `query {
        username (username: "${username}") {
            notifications {
                id,
                sender {
                    username
                },
                type,
                lesson {
                    id
                },
                status
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
        .then(data => {
            let notifications = [];
            data.data.username.notifications.forEach(notification => {
                const newDate = getDate(notification.id)
                notifications.unshift({
                    id: notification.id,
                    sender: notification.sender.username,
                    date: newDate,
                    type: notification.type,
                    lesson: notification.lesson.id,
                    status: notification.status
                })
            });
            return notifications;
        });
}