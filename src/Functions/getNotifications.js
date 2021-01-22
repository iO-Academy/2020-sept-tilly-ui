import getDate from "./getDate";

export default function getNotifications(username, abortController) {
    const query = `query {
        username (username: "${username}") {
            notifications {
                id,
                sender {
                    name,
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
                const newDate = getDate(notification.id);
                notifications.unshift({
                    id: notification.id,
                    senderName: notification.sender.name,
                    senderUsername: notification.sender.username,
                    date: newDate,
                    type: notification.type,
                    lesson: notification.lesson ? notification.lesson.id : null,
                    status: notification.status
                });
            });
            console.log(notifications)
            return notifications;
        });
}