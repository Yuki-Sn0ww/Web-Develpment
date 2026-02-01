const express = require('express')
const app = express()
const port = 3000
// Imports Express framework
// Creates an Express application instance (app)
// Sets the port number to 3000

app.use(express.static('public')) // static files midddleware
app.get('/', (req, res) => {  // basic route
    res.send('hello snow')
})

// '/' - the homepage path,
// req - request object (contains info about the incoming request)
// res - response object (used to send data back)
// res.send() - sends a response to the client

app.get("/about", (req, res) => {
  // basic route
  res.send("about snow");
});
app.get("/contact", (req, res) => {
  // basic route
  res.send("contact snow");
});
app.get("/blog", (req, res) => {
  // basic route
  res.send("snow blog");
});
// the /about, /contact, and /blog routes work the same way, just for different URLs


//dynamic rotes with parameters
app.get('/blog/:slug',(req, res) => {
    console.log(req.params)
    console.log(req.query)
    res.send(`hello ${req.params.slug}`)
})

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})

