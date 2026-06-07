import express from "express"
import { MongoClient } from 'mongodb'
import 'dotenv/config'
const app = express();
const port = 3000;

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const dbName = client.db("passopdb")
const collection = dbName.collection("passwords")

app.get('/', (req, res) => {
  console.log('hello')
  res.send('Hello World24!');
});

app.get('/api/getPasswords', (req, res) => {
  
  res.send('Hello World24!');
});

app.post('/api/savePAsswords', (req, res) => {
  console.log('hello')
  res.send('Hello World24!');
});

app.put('/api/updatePasswords/:id', (req, res) => {
  console.log('hello')
  res.send('Hello World24!');
});

app.delete('/api/deletePasswords/:id', (req, res) => {
  console.log('hello')
  res.send('Hello World24!');
});


app.get('/api/passwords', async (req, res) => {
  const result = await collection.insertOne({
    websiteName: "google",
    url: "google.com",
    password: "test123"
  });
  res.json(result)
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});