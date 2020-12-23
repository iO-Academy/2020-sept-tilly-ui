import getDate from "./getDate";

export default function getMinimalUserData(username, abortController) {
    const query = `query {
          username (username: "${username}") {
            id,
            username,
            name,
            description,
            following {
              id,
              name,
              username,
              description,
              lessons {
                id,
                lesson
              }
            },
            lessons {
              id,
              lesson
            }
          }
        }`
    fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query}),
        signal: abortController.signal
    })
        .then(r => r.json())
        .then(data => {
            if (data.data.username === null) {
                this.setState({notFound: true});
                return;
            }
            let lessons = [];
            data.data.username.lessons.forEach(lesson => {
                const newDate = getDate(lesson.id);
                lessons.unshift({id: lesson.id, lesson: lesson.lesson, date: newDate});
            });
            this.setState({
                id: data.data.username.id,
                username: data.data.username.username,
                name: data.data.username.name,
                description: data.data.username.description,
                lessons: lessons,
                following: data.data.username.following
            });
        });
}