const fs = require('fs');

// fs.writeFileSync("files/apple.txt", "This is an apple.");
// fs.writeFileSync("files/banana.txt", "This is a banana.");
// fs.writeFileSync("files/orange.txt", "This is an orange.");

// fs.unlinkSync("files/banana.txt")
// fs.unlinkSync("files/orange.txt")




const data = fs.readFileSync("files/apple.txt", "utf8");
console.log(data); // Output: This is an apple.

fs.appendFileSync("files/apple.txt", " This is a red apple.");
// console.log(data)