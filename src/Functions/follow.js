import decoder from "./decoder";
import fetchQuery from "./fetchQuery";

export default function follow(event) {
    const token = localStorage.getItem('tillyToken');
    const decoded = decoder(token);
    const query = `mutation {
            follow(
                followee: "${event.target.value}",
                follower: "${decoded.id}",
                token: "${token}"
            )
        }`;
    // fetchQuery(query);
}
