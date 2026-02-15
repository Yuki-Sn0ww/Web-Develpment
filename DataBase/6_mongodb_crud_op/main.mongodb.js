use("crud")

print("Switched DB")

db.operations.insertOne({
    name : "dhami",
    rollNo : 16
})
db.operations.insertMany([
  { name: "Aman", rollNo: 1 },
  { name: "Rohit", rollNo: 2 },
  { name: "Priya", rollNo: 3 },
  { name: "Sneha", rollNo: 4 },
  { name: "Karan", rollNo: 5 },
  { name: "Neha", rollNo: 6 },
  { name: "Arjun", rollNo: 7 },
  { name: "Simran", rollNo: 8 },
  { name: "Vikram", rollNo: 9 },
  { name: "Anjali", rollNo: 10 }
])

let a = db.operations.find({rollNo: 4})
console.log(a.count())
console.log(a.toArray())


let b = db.operations.findOne({rollNo: 4})
console.log(b)
// print("Inserted document")

// printjson(db.operations.find().toArray())
// print("Count:", db.operations.countDocuments())
