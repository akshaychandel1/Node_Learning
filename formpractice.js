const http = require('http');
const fs = require('fs');


http.createServer((req, res)=>{
 
    fs.readFile('html/form.html', 'utf8', (err, data)=>{
        if(err){
            res.write('Error in reading file');
            res.end();
            return;
        }
        else if (req.url == '/'){
            res.writeHead(200,{'content-type': 'text/html'})
            res.write(data);
            res.end();
        }
       else if (req.url == '/submit'){
         let dataBody = [];
         req.on(('data'),chunk=>{
            dataBody.push(chunk);
         })
         req.on('end',()=>{
            let rawData = Buffer.concat(dataBody).toString();
            console.log(rawData);
            res.end();
         })
       }
    })
}).listen(3000);