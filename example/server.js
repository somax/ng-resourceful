const orgs = [{
    "id": 1,
    "name": "org1"
}, {
    "id": 2,
    "name": "org2"
}, {
    "id": 3,
    "name": "org3"
}]

const fs = require('fs');
const server = require('http').createServer((req, res) => {
    if (req.url == '/api/orgs') {
        res.end(JSON.stringify(orgs));
    } else if (/^\/api\/orgs\//.test(req.url)) {
        res.end(JSON.stringify(orgs[req.url.replace('\/api/orgs/', '')]))
    } else {
        let file;
        let url = (req.url == '/') ? './index.html' : '.' + req.url
        try {
            file = fs.readFileSync(url)
        } catch (err) {
            file = 'Not find: ' + url
            res.statusCode = 404
        }
        res.end(file);
    }





})

server.listen(8888);
console.log('http://0.0.0.0:8888');