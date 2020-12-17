import getLessons from "./getLessons";

export default function getUserData(decoded) {
    const query = `query {
              user (id: "${decoded.id}") {
                id,
                username,
                name,
                email,
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
                followers {
                    name,
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
            let lessons = getLessons(data.data.user);
            let allLessons = [];
            data.data.user.following.forEach(user => {
                allLessons = allLessons.concat(getLessons(user));
            });
            allLessons = allLessons.concat(lessons);
            allLessons.sort((a, b) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                id: data.data.user.id,
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