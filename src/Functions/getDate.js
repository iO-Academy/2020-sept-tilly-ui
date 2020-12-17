export default function getDate(id) {
    const date = id.toString().substring(0,8)
    const convert = new Date(parseInt(date, 16) * 1000)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return convert.toLocaleDateString("en-GB", options)
}