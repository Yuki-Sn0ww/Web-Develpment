import mongoose from "mongoose"
import  { Todo }  from "./models/Todo.js"

let conn = await mongoose.connect("mongodb://localhost:27017/todo")

import express from "express"
const app = express()
const port = 3000

// app.get('/', async(req, res)=>{
//     const todo = new Todo({title : "dhami", desc :"i am dhami", isDone : false})
//     await todo.save()
//     res.send("hello")
// })
app.get('/', async(req, res)=>{
    const todo = new Todo({title : 1, desc :"i am dhami", isDone : "harry"})
    await todo.save()
    res.send("hello")
})
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})