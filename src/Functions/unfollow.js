import decoder from "./decoder";
import followFetch from "./followFetch";

export default function unfollow(event, abortController) {
    const token = localStorage.getItem('tillyToken');
    const decoded = decoder(token);
    const query = `mutation {
            unfollow(
                followee: "${event.target.value}",
                follower: "${decoded.id}",
                token: "${token}"
            )
        }`;
    return followFetch(query, abortController);
}
