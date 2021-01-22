import getDate from "./getDate";

export default function getSingleLesson(lessonId, abortController) {
    const query = `query {
        lesson (id: "${lessonId}") {
            id,
            lesson,
            user {
                name,
                username
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
            if (data.data.lesson !== null) {
                const newDate = getDate(lessonId);
                let lesson = {
                    id: lessonId,
                    lesson: data.data.lesson.lesson,
                    date: newDate,
                    name: data.data.lesson.user.name,
                    username: data.data.lesson.user.username
                };
                return lesson;
            }
        });
}