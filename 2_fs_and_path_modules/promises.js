import fs from "fs/promises"

let  a = await fs.readFile("harry.txt")
console.log(a.toString())
let b = await fs.writeFile("harry.txt", "this is promise");
console.log(b.toString());