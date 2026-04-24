// console.log("Thos is sychronous log 1st");

// setTimeout(()=>{
//     console.log("This is synchronous Log 2nd with setTimeout. yeah async tarike se behAVE KRTA H")
// },2000);

// // settimeout and promises async ban jata h 


// console.log("This is the synchronous log 3rd")



const fs = require('fs');

// fs.readFile('text/pet.txt', 'utf8',(err,data) => {

//     if(err){
//         console.log("Error in reading file");
//         return;
//     }
//     console.log("Asynchronous file data: ", data);
// })


const data = fs.readFileSync('text/pet.txt', 'utf8');
console.log("Synchronous file data: ", data);


console.log("This is the synchronous log 1st");








