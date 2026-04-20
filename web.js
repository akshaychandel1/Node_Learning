const http = require('http');
const fs = require('fs');

http.createServer((req, res)=>{

    fs.readFile('html/web.html', 'utf8',(err,data)=>{
        if(err){
            res.write('Error in reading file');
            res.end();
            return;
        }else {
            res.writeHead(200,{'content-type': 'text/html'})
            res.write(data);
            res.end();
        }
    })


}).listen(3000)