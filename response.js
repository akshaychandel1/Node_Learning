const http = require('http');

const age = 25;
http.createServer((req,res)=>{

res.setHeader('Content-Type','text/html');
res.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>hello world</h1>
    <p>my age is ${age}</p>
</body>
</html>`);

    res.end();
    process.exit();   /// used to end the whoel server
}).listen(3000);