const querystring = require('querystring');

function userDataSubmit(req, res) {
    let dataBody = [];
         req.on(('data'),chunk=>{
             dataBody.push(chunk);
            })


           req.on('end',()=>{
                       let rawData = Buffer.concat(dataBody).toString();
                       let readableData = querystring.parse(rawData);
                       console.log(readableData);
                       res.write(`Parsed data: ${JSON.stringify(readableData)}`);
                    })

                      
    res.write(`<h1>Data Submitted Successfully!</h1>
    <p>Thank you for submitting your data.</p>`)
        res.end();
}
module.exports = userDataSubmit;