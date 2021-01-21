import getDate from "./getDate";

export default function getLessons(username, abortController) {
    const query = `query {
        username (username: "${username}") {
            id,
            name,
            lessons {
                id,
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
        .then(data => {
            let lessons = [];
            data.data.username.lessons.forEach(lesson => {
                const newDate = getDate(lesson.id)
                lessons.unshift({id: lesson.id, lesson: lesson.lesson, date: newDate, username: username, userId: data.data.username.id, name: data.data.username.name})
            });
            return lessons;
        });
}