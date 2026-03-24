import express from "express";
import fs from "fs/promises";
const app = express();
const port = 3000;
app.use(express.json())
app.post('/todos', async (req, res) => {
  let data =  req.body
  res.json(data)
})

// app.get("/todos/:id", async (req, res) => {
//   let a = await fetch("https://jsonplaceholder.typicode.com/todos");
//   let data = await a.json();
//   let realData = data.slice(0, 5);
//   let response = realData.find((item) => item.id == req.params.id);

//   if (!response) {
//     return res.status(404).json({ message: "not found" });
//   } else {
//     res.json(response);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
