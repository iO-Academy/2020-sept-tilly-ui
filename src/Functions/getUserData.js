import getLessons from "./getLessons";

export default function getUserData(username) {
    console.log(username);
    const query = `query {
              username (username: "${username}") {
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
            let lessons = getLessons(data.data.username);
            let allLessons = []
            data.data.username.following.forEach(user => {
                allLessons = allLessons.concat(getLessons(user));
            });
            allLessons = allLessons.concat(lessons);
            this.setState({
                username: data.data.username.username,
                name: data.data.username.name,
                email: data.data.username.email,
                description: data.data.username.description,
                lessons: lessons,
                following: data.data.username.following,
                followers: data.data.username.followers,
                allLessons: allLessons
            });
        });
}