import getLessons from "./getLessons";

export default function getUserData(decoded) {
    const query = `query {
              user (id: "${decoded.id}") {
                username,
                name,
                email,
                description,
                following {
                  name
                  username
                  lessons {
                    id,
                    lesson
                  }
                },
                followers {
                    name
                    username
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
        body: JSON.stringify({query})
    })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            let lessons = getLessons(data.data.user);
            let allLessons = []
            data.data.user.following.forEach(user => {
                allLessons = allLessons.concat(getLessons(user));
            });
            allLessons = allLessons.concat(lessons);
            this.setState({
                username: data.data.user.username,
                name: data.data.user.name,
                email: data.data.user.email,
                description: data.data.user.description,
                lessons: lessons,
                following: data.data.user.following,
                followers: data.data.user.followers,
                allLessons: allLessons
            });
        });
}