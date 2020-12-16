export default function getUser(decoded) {
    const query = `query {
              user (id: "${decoded.id}") {
                username,
                name,
                email,
                description,
                following {
                  name
                }
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
        body: JSON.stringify({query})
    })
        .then(r => r.json())
        .then(data => {
            let lessons = [];
            data.data.user.lessons.forEach(lesson => {
                const date = lesson.id.toString().substring(0,8)
                const convert = new Date(parseInt(date, 16) * 1000)
                const newDate =convert.toLocaleDateString("EN-GB")
                lessons.unshift({lesson: lesson.lesson, date: newDate})
            })
            this.setState({
                username: data.data.user.username,
                name: data.data.user.name,
                email: data.data.user.email,
                description: data.data.user.description,
                lessons: lessons,
                following: data.data.user.following
            })
        });
}