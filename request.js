const http = require('http');

const server = http.createServer((req,res)=>{

    // console.log(req.url);
    // console.log(req.headers);

        

    // console.log(req.headers.host);
    // console.log(req.method);
    // res.write("Hello World");

    if (req.url == '/') {
        res.write('<h1>Home Page</h1>')
    }
    else if (req.url == "/login" ) {
        res.write('<h1>Login Page</h1>')
    }else{
        res.write('<h1>404 Not Found</h1>')
    }

    res.end();

}).listen(3200)