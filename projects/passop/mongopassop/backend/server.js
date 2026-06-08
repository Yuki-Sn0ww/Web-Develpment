import express from "express"
import { MongoClient } from 'mongodb'
import 'dotenv/config'
import cors from "cors"
const app = express();
const port = 3000;
app.use(cors())

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
const dbName = client.db("passopdb")
const collection = dbName.collection("passwords")

app.get('/', (req, res) => {
  console.log('hello')
  res.send('Hello World24!');
});

app.get('/api/getPasswords', async (req, res) => {
  const passwords = await collection.find({}).toArray();
  res.json(passwords);
  
});

app.post('/api/savePAsswords', (req, res) => {

});

app.put('/api/updatePasswords/:id', (req, res) => {
  
});

app.delete('/api/deletePasswords/:id', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});