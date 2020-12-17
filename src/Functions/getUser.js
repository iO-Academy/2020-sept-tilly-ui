export default function getUser(param) {
    const query = `query {
              username (username: "${param}") {
                id,
                username,
                name,
                email,
                description,
                following {
                  username
                }
                lessons {
                  id,
                  lesson
                }
              }
            }`;
    fetch('http://localhost:4002/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({query})
    })
        .then(r => r.json())
        .then(data => {
            let lessons = [];
            data.data.username.lessons.forEach(lesson => {
                const date = lesson.id.toString().substring(0,8);
                const convert = new Date(parseInt(date, 16) * 1000);
                const newDate = convert.toLocaleDateString("EN-GB");
                lessons.unshift({lesson: lesson.lesson, date: newDate});
            });
            this.setState({
                username: data.data.username.username,
                name: data.data.username.name,
                email: data.data.username.email,
                description: data.data.username.description,
                lessons: lessons,
                following: data.data.username.following
            });
        });
}