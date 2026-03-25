import express from "express";
import fs from "fs/promises";
const app = express();
const port = 3000;
app.use(express.json());

// app.post('/todos', async (req, res) => {
//   let data =  req.body
//   res.json(data)
// })

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
let a = [
    {
      id: 1,
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
      role: "admin",
      is_active: true,
      last_login: "2026-03-20T14:32:00Z",
    },
    {
      id: 2,
      first_name: "Marcus",
      last_name: "Chen",
      email: "m.chen@example.com",
      role: "user",
      is_active: true,
      last_login: "2026-03-24T09:15:22Z",
    },
    {
      id: 3,
      first_name: "Elena",
      last_name: "Rodriguez",
      email: "elena.r@example.com",
      role: "editor",
      is_active: false,
      last_login: "2026-02-15T11:45:10Z",
    },
    {
      id: 4,
      first_name: "David",
      last_name: "Smith",
      email: "dsmith_99@example.com",
      role: "user",
      is_active: true,
      last_login: "2026-03-25T18:05:00Z",
    },
    {
      id: 5,
      first_name: "Sarah",
      last_name: "O'Connor",
      email: "s.oconnor@example.com",
      role: "moderator",
      is_active: true,
      last_login: "2026-03-21T16:20:45Z",
    },
  ];

// app.put("/todos/:id", async (req, res) => {
//   let index = a.findIndex((item) => item.id === Number(req.params.id));
 
//   if (index === -1) {
//     return res.status(404).json({ message: "not found" })
//   }

//   a[index] = {
//     ...a[index],
//     ...req.body
//   }

//   res.json(a[index])
// });

app.delete("/todos/:id", (req, res) => {
  let id = Number(req.params.id)

  let index = a.findIndex((item)=> item.id === id)
  if (index === -1) {
    return res.status(404).json({ message: "not found" })
  }
  const deletedItem = a[index] 
  a.splice(index, 1)
  res.json({
  message: "deleted",
  data: deletedItem
})
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
