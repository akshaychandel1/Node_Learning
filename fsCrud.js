const fs = require('fs');

// fs.writeFileSync("files/apple.txt", "This is an apple.");
// fs.writeFileSync("files/banana.txt", "This is a banana.");
// fs.writeFileSync("files/orange.txt", "This is an orange.");

// fs.unlinkSync("files/banana.txt")
// fs.unlinkSync("files/orange.txt")




// const data = fs.readFileSync("files/apple.txt", "utf8");
// console.log(data); // Output: This is an apple.

// fs.appendFileSync("files/apple.txt", " This is a red apple.");
// // console.log(data)







// for taking input from the terminal 

console.log(process.argv[2])

const opreation = process.argv[2]
 if (opreation === "write") {
    const name = process.argv[3]
    const content = process.argv[4]
    console.log(opreation,name,content)
    fs.writeFileSync(`files/${name}.txt`, content)
 } else if (opreation === "read"){
    const name = process.argv[3]
    let data = fs.readFileSync(`files/${name}.txt`, "utf8")
    console.log(data)
    } else if (opreation === "update"){
        const name = process.argv[3];
        const content = process.argv[4];
        const data = fs.appendFileSync(`files/${name}.txt`, content) 
        console.log(data);
    } else if(opreation === "delete"){
        const name = process.argv[3];
        const data = fs.unlinkSync(`files/${name}.txt` )
        console.log(data);
        
    } else {
        console.log("Invalid Opreation")
    }