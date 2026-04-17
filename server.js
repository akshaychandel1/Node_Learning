const http = require('http');

// http.createServer().listen(3000);


http.createServer((req,res)=>{
    res.write("hello world");
    res.end();
}).listen(3000);