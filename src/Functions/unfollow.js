import decoder from "./decoder";

export default function unfollow(event) {
    const token = localStorage.getItem('tillyToken');
    const decoded = decoder(token);
    const query = `mutation {
            unfollow(
                followee: "${event.target.value}",
                follower: "${decoded.id}",
                token: "${token}"
            )
        }`;
    this.followFetch(query, this.abortController);
}
