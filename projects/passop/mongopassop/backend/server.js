import express from "express"
import { MongoClient, ObjectId } from 'mongodb'
import 'dotenv/config'
import cors from "cors"
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())

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

app.post('/api/savePAsswords', async (req, res) => {
  console.log(req.body)
  const result = await collection.insertOne(req.body)
  res.json(result)
});

app.put('/api/updatePasswords/:id', async (req, res) => {
  const {_id, ...updateData} = req.body;
  await collection.updateOne({_id : new ObjectId(req.params.id)}, {$set : updateData});
  res.json({success : true});
  
});

app.delete('/api/deletePasswords/:id', async (req, res) => {
  await collection.deleteOne({_id : new ObjectId(req.params.id)});
  res.json({success : true}); 
});
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});