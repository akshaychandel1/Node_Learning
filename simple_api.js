const http = require('http');

const userData = [
    {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
    } ,
    {
        name: 'Jane Smith',
        age: 25,
        email: 'jane.smith@example.com'
    } ,
    {
        name: 'Alice Johnson',
        age: 28,
        email: 'alice.johnson@example.com'
    }

];

http.createServer((req, res) =>{

res.setHeader('Content-Type', 'application/json');
res.write(JSON.stringify(userData))
res.end();

}).listen(3100);