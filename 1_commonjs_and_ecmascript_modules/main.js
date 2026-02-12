// // server.mjs                            //using type module
// import { createServer } from "node:http";

// const server = createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end('<p>hello dhami!</p>');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, "127.0.0.1", () => {
//   console.log("Listening on 127.0.0.1:3000");
// });

// run with `node server.mjs`

// import {a,b,c,d,e,f} from "./mymodule.js"
// console.log(a,b,c,d,e,f)
// import dhami from "./mymodule.js"
// console.log(dhami);


// server.mjs      // using type commonjs

// const http = require("node:http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end('<p>hello dhami!</p>');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, "127.0.0.1", () => {
//   console.log("Listening on 127.0.0.1:3000");
// });
const a = require("./mymodule2.js");
const c = require("./mymodule2.js");
console.log(a);
console.log(c);

// run with `node server.mjs`