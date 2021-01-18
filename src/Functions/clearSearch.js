export default function clearSearch() {
    document.querySelector('.mainSearch input').value = "";
    this.setState({
        display: ""
    });
}