// without any html file 

// const http = require('http');

// http.createServer((req,res)=>{
//     res.writeHead(200,{'content-type': 'text/html'})
//     console.log(req.url);

//     if(req.url == '/'){
//         res.write(`
// <html>
// <head>
//     <title>Form</title>
// </head>
// <body>
//     <h1>Form</h1>
//     <form action="/submit" method="post">
//         <label for="name">Name:</label>
//         <input type="text" id="name" name="name"><br><br>
//         <label for="email">Email:</label>
//         <input type="email" id="email" name="email"><br><br>
//         <input type="submit" value="Submit">
//     </form>
// </body>
// </html>`);
//     } else if (req.url == '/submit') {
//         res.write('<h1>Form Submitted</h1>')
//     }
// res.end();

// }).listen(3000)


// with html file 



const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('html/form.html','utf8',(err,data)=>{
        if(err){
            res.end('Internal Server error');
            return;
        }
        if(req.url == '/'){
            res.write(data);
        } else if (req.url == '/submit'){
            let dataBody = [];
            req.on('data',(chunk)=>{
                  dataBody.push(chunk);
            })
            req.on('end',()=>{
            let rawData = Buffer.concat(dataBody).toString();
            console.log(rawData);
            })
            res.write('<h1>Form Submitted</h1>')
        }
        res.end();
    })
}).listen(3000)