import getLessons from "./getLessons";
import getFollowing from "./getFollowing";

export default function getTimeline(username, abortController) {

    // const query =
    //     `query {
    //         username (username: "${username}") {
    //             following {
    //                 username
    //             }
    //         }
    //     }`
    // fetch('http://localhost:4002/graphql', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({query}),
    //     signal: abortController.signal
    // })
    //     .then(r => r.json())
        // .then(data => {
        //     let allLessons = [];
        //     getLessons(username)
        //         .then(lessons => {
        //             allLessons.concat(lessons)
        //         })
        //         .then(allLessons => {
        //             data.data.username.following.forEach(user => {
        //                 getLessons(user.username)
        //                     .then(data => {
        //                         allLessons = allLessons.concat(data)
        //                     })
        //             })
        //         })
        //         .then()

            // data.data.username.following.forEach(user => {
            //     allLessons = allLessons.concat(getLessons(user.username));
            // });
            // allLessons = allLessons.concat(lessons);
            // allLessons.sort((a, b) => {
            //     if (a.id > b.id) {
            //         return -1;
            //     }
            //     if (a.id < b.id) {
            //         return 1;
            //     }
            //     return 0;
            // });
            // this.setState({
                // id: data.data.user.id,
                // username: data.data.user.username,
                // name: data.data.user.name,
                // email: data.data.user.email,
                // description: data.data.user.description,
                // allLessons: lessons,
                // following: data.data.user.following,
                // followers: data.data.user.followers,
                // allLessons: allLessons
            // });
        // });
}