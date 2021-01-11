import decoder from "./decoder";
import fetchQuery from "./fetchQuery";
import followFetch from "./followFetch";

export default function follow(event, abortController) {
    const token = localStorage.getItem('tillyToken');
    const decoded = decoder(token);
    const query = `mutation {
            follow(
                followee: "${event.target.value}",
                follower: "${decoded.id}",
                token: "${token}"
            )
        }`;
    return followFetch(query, abortController);
}
