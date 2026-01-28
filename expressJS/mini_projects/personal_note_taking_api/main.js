const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.post('/notes/add',(req,res)=>{
    fs.writeFile('snow.txt','i am snow',(error)=>{
        if (error) {
            console.log("error occurs in adding a note")
            return res.status(500).send("error in adding a file")
        }
        res.send("file is written")
        console.log("notes is writen")
    })
})

app.get('/notes/:title',(req,res)=>{
    fs.readFile(req.params.title,(error,data)=>{
        if (error) {
            console.log("file didnot exist")
            return res.status(500).send("error in reading a file");
        }
        res.send(`title${req.params.title}content${data.toString()}`);
        console.log("read the file")
    })
})

app.delete('/notes/:title',(req,res)=>{
    fs.unlink(req.params.title,(error)=>{
        if (error) {
            console.log("file is not delted due to error")
            return res.status(500).send("error in deleting a file");
        }
        res.send("note is deleted")
        console.log("note is deleted")
    })
})


app.listen(port, (req,res)=>{
    console.log(`app is listening at port ${port}`)
})