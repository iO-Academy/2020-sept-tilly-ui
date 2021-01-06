import decoder from "./decoder";

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
    this.followFetch(query, this.abortController);
}
