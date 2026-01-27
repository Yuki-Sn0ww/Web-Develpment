const fs = require('fs')
// console.log(fs)
console.log("starting")
fs.writeFileSync("harry.txt", "harry is a good boy")
console.log("ending");

console.log("starting")
fs.writeFile("harry2.txt", "harry is a good boy",()=>{ // this is good to use
    console.log("done")
})
console.log("ending");

console.log("starting")
fs.writeFile("harry2.txt", "harry is a good boy",()=>{ // this is good to use
    console.log("done")
    fs.readFile("harry2.txt", (error, data)=>{
        console.log(error,data)
        console.log(error,data.toString())
    })
})
console.log("ending");

fs.appendFile("harry.txt", "harryrobo", (e, d)=> {
    console.log(d)
})

