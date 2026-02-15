const express = require("express");
const app = express();
const port = 3000;


// //middleware
// app.use((req, res, next) => {
//   console.log("middleware1 is executed");
// });

// app.use((req, res, next) => {
//   console.log("middleware2 is executed");
//   next();
// });
// app.use((req, res, next) => {
//   res.send("middleware3 is executed");
// });



//track when the request made and which method is used

const fs = require('fs')
app.use((req, res, next)=> {
    const log = `${new Date().toLocaleString('en-IN')} - ${req.method} - ${req.url}\n`
    console.log(log);
    fs.appendFileSync("logs.txt", log);
    next();
})
app.use((req, res, next) => {
  req.user = "snow";
  req.timestamp = Date.now();
  next();
});
app.get('/about', (req, res)=>{
  res.send(`hello ${req.user}!`)

})

app.get("/", (req, res) => {
  res.send("Hello World!");
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});