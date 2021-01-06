export default function decoder(token) {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, 'secret');
    localStorage.setItem('tillyToken', token);
    return decoded;
}