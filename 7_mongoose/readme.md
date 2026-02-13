# Mongoose Tutorial - Complete Guide

## 📚 Table of Contents
1. [What is Mongoose?](#what-is-mongoose)
2. [Why Use Mongoose?](#why-use-mongoose)
3. [Installation & Setup](#installation--setup)
4. [Core Concepts](#core-concepts)
5. [Schema Definition](#schema-definition)
6. [Models](#models)
7. [CRUD Operations](#crud-operations)
8. [Type Casting vs Validation](#type-casting-vs-validation)
9. [Common Patterns](#common-patterns)
10. [Error Handling](#error-handling)
11. [Best Practices](#best-practices)

---

## 🎯 What is Mongoose?

**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js.

### Key Points:
- Provides a **schema-based solution** to model application data
- Acts as a layer between your Node.js application and MongoDB
- Enforces structure on MongoDB's schema-less database
- Written in JavaScript, works seamlessly with Express.js

### The "Traffic Police" Analogy 🚦
Think of Mongoose as a traffic police officer for your database:
- MongoDB alone = No traffic rules (anything goes)
- Mongoose = Traffic police (enforces rules, prevents accidents)
- Prevents invalid data from entering your database
- Ensures data consistency and security

---

## 💡 Why Use Mongoose?

### 1. **Schema Definition**
MongoDB is schema-less, but real applications need structure:
```javascript
// Without Mongoose - MongoDB accepts anything
db.todos.insertOne({ 
    title: 123,           // Number
    age: "twenty",        // String instead of Number
    randomField: true     // Unplanned field
})

// With Mongoose - Enforces structure
const todo = new Todo({ 
    title: 123,           // Will be converted to "123" or rejected
    age: "twenty"         // Will fail validation if strict
})
```

### 2. **Automatic Validation**
- Checks data types before saving
- Validates required fields
- Supports custom validators
- Prevents database corruption

### 3. **Type Casting**
Automatically converts compatible types:
```javascript
title: 1           →  "1"        (Number to String)
isDone: "yes"      →  true       (String to Boolean)
age: "25"          →  25         (String to Number)
```

### 4. **Built-in Features**
- Default values
- Required fields
- Unique constraints
- Timestamps (createdAt, updatedAt)
- Middleware/Hooks
- Query helpers
- Virtual properties

### 5. **Boilerplate Reduction**
Simplifies complex MongoDB operations:
```javascript
// MongoDB Driver (Complex)
const result = await db.collection('todos')
    .find({ isDone: false })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray()

// Mongoose (Simple)
const todos = await Todo.find({ isDone: false })
    .sort('-createdAt')
    .limit(10)
```

---

## 🔧 Installation & Setup

### Step 1: Install Dependencies
```bash
npm install mongoose express
```

### Step 2: Project Structure
```
project/
│
├── models/
│   └── Todo.js          # Schema definitions
│
├── main.js              # Main application file
├── package.json
└── README.md
```

### Step 3: Connect to MongoDB
```javascript
import mongoose from "mongoose";

// Connect to local MongoDB
const conn = await mongoose.connect("mongodb://localhost:27017/todo");

// Or with options
const conn = await mongoose.connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

**Connection String Format:**
```
mongodb://[host]:[port]/[database_name]
```
- **host**: `localhost` (local) or remote server IP
- **port**: `27017` (default MongoDB port)
- **database_name**: Your database name (auto-created if doesn't exist)

---

## 📖 Core Concepts

### 1. **Schema**
A blueprint that defines the structure of documents:
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String,
    isDone: Boolean,
    days: Number
});
```

### 2. **Model**
A compiled version of the schema - your interface to the database:
```javascript
const Todo = mongoose.model('Todo', TodoSchema);
```
- Model name: `'Todo'` (singular, capitalized)
- Collection name: `'todos'` (plural, lowercase) - **auto-generated**

### 3. **Document**
An instance of a Model - represents one record:
```javascript
const todo = new Todo({ title: "Learn Mongoose" });
await todo.save(); // Saves this document to database
```

---

## 🏗️ Schema Definition

### Basic Schema
```javascript
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: String,      // Simple type definition
    desc: String,
    isDone: Boolean,
    days: Number
});
```

### Advanced Schema with Options
```javascript
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,              // Must be provided
        default: "Untitled",         // Default value if not provided
        trim: true,                  // Removes whitespace
        lowercase: true,             // Converts to lowercase
        maxlength: 100,              // Maximum length
        minlength: 3                 // Minimum length
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],  // Custom error message
        maxlength: 500
    },
    isDone: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],  // Only these values allowed
        default: 'medium'
    },
    tags: {
        type: [String],              // Array of strings
        default: []
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v > new Date();  // Must be future date
            },
            message: 'Due date must be in the future'
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to another collection
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt automatically
});

export const Todo = mongoose.model('Todo', TodoSchema);
```

### Common Schema Types
| Type | Example | Description |
|------|---------|-------------|
| `String` | `"Hello"` | Text data |
| `Number` | `42`, `3.14` | Integers or decimals |
| `Boolean` | `true`, `false` | True/False values |
| `Date` | `new Date()` | Date and time |
| `Array` | `[1, 2, 3]` | Arrays of any type |
| `ObjectId` | `mongoose.Types.ObjectId` | Reference to other documents |
| `Mixed` | `{ any: 'data' }` | Any data type |
| `Buffer` | Binary data | For files/images |

### Schema Options
```javascript
const schema = new mongoose.Schema({
    // fields...
}, {
    timestamps: true,        // Adds createdAt, updatedAt
    collection: 'my_todos',  // Custom collection name
    strict: true,            // Ignore fields not in schema
    versionKey: false        // Removes __v field
});
```

---

## 🎨 Models

### Creating a Model
```javascript
// Syntax: mongoose.model(ModelName, Schema)
export const Todo = mongoose.model('Todo', TodoSchema);
```

### Model Naming Convention
```javascript
mongoose.model('Todo', schema)      →  Collection: 'todos'
mongoose.model('User', schema)      →  Collection: 'users'
mongoose.model('Category', schema)  →  Collection: 'categories'
```

### Using Models
```javascript
import { Todo } from "./models/Todo.js";

// Create instance
const todo = new Todo({ title: "Buy groceries" });

// Save to database
await todo.save();

// Query database
const allTodos = await Todo.find();
const oneTodo = await Todo.findOne({ title: "Buy groceries" });
```

---

## 🔄 CRUD Operations

### CREATE - Adding Documents

#### Method 1: Using `new` + `save()`
```javascript
app.get('/create', async (req, res) => {
    try {
        const todo = new Todo({
            title: "Learn Mongoose",
            desc: "Complete the tutorial",
            isDone: false,
            days: 7
        });
        await todo.save();
        res.json({ message: "Todo created!", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Method 2: Using `create()`
```javascript
app.get('/create-direct', async (req, res) => {
    try {
        const todo = await Todo.create({
            title: "Learn Mongoose",
            desc: "Complete the tutorial",
            isDone: false
        });
        res.json({ message: "Todo created!", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Method 3: Insert Multiple
```javascript
app.get('/create-many', async (req, res) => {
    try {
        const todos = await Todo.insertMany([
            { title: "Task 1", desc: "First task", isDone: false },
            { title: "Task 2", desc: "Second task", isDone: true },
            { title: "Task 3", desc: "Third task", isDone: false }
        ]);
        res.json({ message: "Todos created!", count: todos.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

### READ - Fetching Documents

#### Find All
```javascript
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Find with Conditions
```javascript
app.get('/todos/incomplete', async (req, res) => {
    try {
        // Find todos where isDone is false
        const todos = await Todo.find({ isDone: false });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Find One
```javascript
app.get('/todos/:title', async (req, res) => {
    try {
        // Find first matching document
        const todo = await Todo.findOne({ title: req.params.title });
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Find by ID
```javascript
app.get('/todos/id/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Advanced Queries
```javascript
app.get('/todos/search', async (req, res) => {
    try {
        const todos = await Todo.find({
            isDone: false,                    // Where isDone is false
            days: { $gt: 5, $lt: 30 }        // Where days > 5 AND days < 30
        })
        .sort({ createdAt: -1 })             // Sort by newest first
        .limit(10)                            // Limit to 10 results
        .select('title desc isDone')          // Only return these fields
        .exec();
        
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

**Query Operators:**
| Operator | Meaning | Example |
|----------|---------|---------|
| `$gt` | Greater than | `{ age: { $gt: 18 } }` |
| `$gte` | Greater than or equal | `{ age: { $gte: 18 } }` |
| `$lt` | Less than | `{ age: { $lt: 65 } }` |
| `$lte` | Less than or equal | `{ age: { $lte: 65 } }` |
| `$ne` | Not equal | `{ status: { $ne: 'deleted' } }` |
| `$in` | In array | `{ role: { $in: ['admin', 'user'] } }` |
| `$nin` | Not in array | `{ role: { $nin: ['guest'] } }` |

---

### UPDATE - Modifying Documents

#### Update One Document
```javascript
app.get('/update/:title', async (req, res) => {
    try {
        const result = await Todo.updateOne(
            { title: req.params.title },      // Filter: Find this
            { isDone: true }                   // Update: Change to this
        );
        
        res.json({ 
            message: "Updated", 
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Update Multiple Documents
```javascript
app.get('/update/mark-all-done', async (req, res) => {
    try {
        const result = await Todo.updateMany(
            { isDone: false },          // Update all incomplete todos
            { isDone: true }            // Mark them as done
        );
        
        res.json({ 
            message: "All todos marked as done",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Find and Update (Returns Updated Document)
```javascript
app.get('/update-and-return/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { isDone: true },
            { new: true }  // Return updated document (not old one)
        );
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Advanced Updates
```javascript
app.get('/increment-days/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { 
                $inc: { days: 1 },              // Increment days by 1
                $push: { tags: 'important' },   // Add to array
                $set: { isDone: false }         // Set value
            },
            { new: true }
        );
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

**Update Operators:**
| Operator | Action | Example |
|----------|--------|---------|
| `$set` | Set value | `{ $set: { title: "New" } }` |
| `$inc` | Increment | `{ $inc: { count: 1 } }` |
| `$push` | Add to array | `{ $push: { tags: 'new' } }` |
| `$pull` | Remove from array | `{ $pull: { tags: 'old' } }` |
| `$unset` | Remove field | `{ $unset: { desc: "" } }` |

---

### DELETE - Removing Documents

#### Delete One
```javascript
app.get('/delete/:title', async (req, res) => {
    try {
        const result = await Todo.deleteOne({ title: req.params.title });
        
        res.json({ 
            message: "Deleted",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Delete Many
```javascript
app.get('/delete/completed', async (req, res) => {
    try {
        const result = await Todo.deleteMany({ isDone: true });
        
        res.json({ 
            message: "All completed todos deleted",
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

#### Find and Delete (Returns Deleted Document)
```javascript
app.get('/delete-and-return/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json({ message: "Deleted", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## ⚖️ Type Casting vs Validation

### What is Type Casting?

Type casting is Mongoose's automatic conversion of compatible data types.

```javascript
// Your Schema
const TodoSchema = new mongoose.Schema({
    title: String,
    isDone: Boolean,
    days: Number
});

// You provide
const todo = new Todo({
    title: 1,           // Number
    isDone: "harry",    // String
    days: "25"          // String
});

// Mongoose converts to
{
    title: "1",         // Converted to String
    isDone: true,       // "harry" is truthy → true
    days: 25            // Converted to Number
}
```

### Type Casting Rules

| Original → Target | Result | Example |
|-------------------|--------|---------|
| Number → String | ✅ Converts | `1` → `"1"` |
| String → Number | ✅ If valid | `"25"` → `25` |
| String → Number | ❌ If invalid | `"abc"` → Error |
| Any → Boolean | ✅ Truthy/Falsy | `"hello"` → `true`, `""` → `false` |
| String → Date | ✅ If valid | `"2024-01-01"` → Date object |

### Testing Type Casting

```javascript
// This will SUCCEED (type casting works)
app.get('/test-casting', async (req, res) => {
    try {
        const todo = new Todo({
            title: 123,              // → "123"
            isDone: "yes",           // → true
            days: "30"               // → 30
        });
        await todo.save();
        res.json({ message: "Saved!", todo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

### When Type Casting FAILS

```javascript
// This will FAIL (cannot convert)
app.get('/test-fail', async (req, res) => {
    try {
        const todo = new Todo({
            title: "Valid Title",
            isDone: false,
            days: "not-a-number"     // ❌ Cannot convert to Number
        });
        await todo.save();
        res.send("Saved");
    } catch (error) {
        res.status(400).json({ 
            message: "Validation failed!",
            error: error.message 
        });
    }
});

// Error: Cast to Number failed for value "not-a-number"
```

### Making Validation Strict

#### Option 1: Required Fields
```javascript
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true  // Must be provided
    },
    isDone: {
        type: Boolean,
        required: true  // Must be provided
    }
});

// This will FAIL
const todo = new Todo({ title: "Only Title" });
// Error: isDone is required
```

#### Option 2: Custom Validators
```javascript
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        validate: {
            validator: function(v) {
                return v.length >= 3;  // Minimum 3 characters
            },
            message: 'Title must be at least 3 characters long'
        }
    }
});

// This will FAIL
const todo = new Todo({ title: "Hi" });
// Error: Title must be at least 3 characters long
```

#### Option 3: Enum (Allowed Values)
```javascript
const TodoSchema = new mongoose.Schema({
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],  // Only these values
        required: true
    }
});

// This will FAIL
const todo = new Todo({ priority: "urgent" });
// Error: priority is not a valid enum value
```

#### Option 4: Min/Max Values
```javascript
const TodoSchema = new mongoose.Schema({
    days: {
        type: Number,
        min: [1, 'Days must be at least 1'],
        max: [365, 'Days cannot exceed 365']
    }
});

// This will FAIL
const todo = new Todo({ days: 500 });
// Error: Days cannot exceed 365
```

---

## 🎯 Common Patterns

### Pattern 1: Timestamps
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    desc: String
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

// Result in database:
{
    title: "My Todo",
    desc: "Description",
    createdAt: "2024-02-13T10:30:00.000Z",
    updatedAt: "2024-02-13T10:30:00.000Z"
}
```

### Pattern 2: Default Values
```javascript
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "Untitled Todo"
    },
    isDone: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        default: function() {
            return `user_${Date.now()}`;  // Dynamic default
        }
    }
});
```

### Pattern 3: Virtual Properties
```javascript
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

// Create virtual property (not saved in DB)
UserSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Usage
const user = await User.findOne();
console.log(user.fullName);  // "John Doe"
```

### Pattern 4: Middleware/Hooks
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    slug: String
});

// Pre-save hook (runs before saving)
TodoSchema.pre('save', function(next) {
    // Create slug from title
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-');
    next();
});

// Post-save hook (runs after saving)
TodoSchema.post('save', function(doc, next) {
    console.log(`Todo ${doc.title} has been saved!`);
    next();
});
```

### Pattern 5: Instance Methods
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    isDone: Boolean
});

// Add custom method to all documents
TodoSchema.methods.markComplete = function() {
    this.isDone = true;
    return this.save();
};

// Usage
const todo = await Todo.findOne();
await todo.markComplete();  // Custom method
```

### Pattern 6: Static Methods
```javascript
const TodoSchema = new mongoose.Schema({
    title: String,
    isDone: Boolean
});

// Add custom method to the Model
TodoSchema.statics.findIncomplete = function() {
    return this.find({ isDone: false });
};

// Usage
const incompleteTodos = await Todo.findIncomplete();  // Custom static method
```

### Pattern 7: References (Relationships)
```javascript
// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Todo Schema with reference
const TodoSchema = new mongoose.Schema({
    title: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Reference to User model
    }
});

// Usage - Populate reference
const todo = await Todo.findOne().populate('createdBy');
console.log(todo.createdBy.name);  // Access user data
```

---

## 🚨 Error Handling

### Basic Error Handling
```javascript
app.get('/create', async (req, res) => {
    try {
        const todo = new Todo({ title: "Test" });
        await todo.save();
        res.json({ message: "Success", todo });
    } catch (error) {
        res.status(500).json({ 
            message: "Error creating todo",
            error: error.message 
        });
    }
});
```

### Validation Error Handling
```javascript
app.get('/create', async (req, res) => {
    try {
        const todo = new Todo({ 
            title: "AB",  // Too short (min: 3)
            priority: "urgent"  // Not in enum
        });
        await todo.save();
        res.json({ message: "Success" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract validation errors
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return res.status(400).json({ 
                message: "Validation failed",
                errors 
            });
        }
        res.status(500).json({ error: error.message });
    }
});

// Response:
{
    "message": "Validation failed",
    "errors": {
        "title": "Title must be at least 3 characters long",
        "priority": "priority is not a valid enum value"
    }
}
```

### Cast Error Handling
```javascript
app.get('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.json(todo);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: "Invalid ID format",
                error: error.message 
            });
        }
        res.status(500).json({ error: error.message });
    }
});
```

### Duplicate Key Error
```javascript
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true  // Email must be unique
    }
});

app.post('/register', async (req, res) => {
    try {
        const user = await User.create({ email: req.body.email });
        res.json({ message: "User created", user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Email already exists",
                field: Object.keys(error.keyPattern)[0]
            });
        }
        res.status(500).json({ error: error.message });
    }
});
```

---

## ✅ Best Practices

### 1. Always Use Try-Catch
```javascript
// ❌ BAD - No error handling
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// ✅ GOOD - Proper error handling
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 2. Use Async/Await Consistently
```javascript
// ❌ BAD - Mixing callbacks and promises
app.get('/todo', (req, res) => {
    Todo.findOne({}, function(err, todo) {
        if (err) return res.status(500).send(err);
        res.json(todo);
    });
});

// ✅ GOOD - Clean async/await
app.get('/todo', async (req, res) => {
    try {
        const todo = await Todo.findOne({});
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 3. Validate User Input
```javascript
// ✅ GOOD - Validate before creating
app.post('/create', async (req, res) => {
    try {
        // Check if required fields exist
        if (!req.body.title || !req.body.desc) {
            return res.status(400).json({ 
                message: "Title and description are required" 
            });
        }
        
        const todo = await Todo.create(req.body);
        res.json({ message: "Created", todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 4. Use Meaningful Schema Constraints
```javascript
// ✅ GOOD - Clear constraints
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    age: {
        type: Number,
        min: [13, 'Must be at least 13 years old'],
        max: [120, 'Invalid age']
    }
});
```

### 5. Keep Schemas in Separate Files
```javascript
// ✅ GOOD - Organized structure
// models/Todo.js
export const Todo = mongoose.model('Todo', TodoSchema);

// models/User.js
export const User = mongoose.model('User', UserSchema);

// main.js
import { Todo } from './models/Todo.js';
import { User } from './models/User.js';
```

### 6. Use Environment Variables
```javascript
// ✅ GOOD - Configurable connection
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo';
await mongoose.connect(MONGO_URI);
```

### 7. Handle Connection Errors
```javascript
// ✅ GOOD - Monitor connection
mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ Connection error:', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
```

### 8. Use Indexes for Performance
```javascript
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true  // Creates index for faster queries
    },
    email: {
        type: String,
        unique: true  // Automatically creates unique index
    }
});

// Compound index
TodoSchema.index({ createdBy: 1, isDone: 1 });
```

### 9. Limit Query Results
```javascript
// ✅ GOOD - Prevent overload
app.get('/todos', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const todos = await Todo.find()
            .limit(limit)
            .skip(skip)
            .sort('-createdAt');
            
        const total = await Todo.countDocuments();
        
        res.json({
            todos,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 10. Use Lean for Read-Only Queries
```javascript
// Regular query (returns Mongoose document)
const todos = await Todo.find({});  // Slower, more memory

// Lean query (returns plain JavaScript object)
const todos = await Todo.find({}).lean();  // Faster, less memory

// Use lean() when you only need to read data, not modify it
```

---

## 🎓 Summary

### Key Takeaways

1. **Mongoose = Structure + Safety**
   - Adds schema to schema-less MongoDB
   - Validates data before saving
   - Prevents database corruption

2. **Type Casting is Powerful but Can Hide Bugs**
   - Mongoose converts compatible types automatically
   - Use validation to enforce strict rules
   - Test edge cases thoroughly

3. **Always Handle Errors**
   - Use try-catch blocks
   - Return meaningful error messages
   - Don't let your app crash

4. **CRUD Operations are Simple**
   - Create: `new Model()` + `save()` or `create()`
   - Read: `find()`, `findOne()`, `findById()`
   - Update: `updateOne()`, `updateMany()`, `findByIdAndUpdate()`
   - Delete: `deleteOne()`, `deleteMany()`, `findByIdAndDelete()`

5. **Schema Design Matters**
   - Define clear constraints
   - Use appropriate data types
   - Add validation rules
   - Think about relationships

---

## 🔗 Quick Reference

### Common Mongoose Methods
```javascript
// CREATE
await Model.create({ data })
const doc = new Model({ data }); await doc.save()
await Model.insertMany([{ data1 }, { data2 }])

// READ
await Model.find({ conditions })
await Model.findOne({ conditions })
await Model.findById(id)
await Model.countDocuments({ conditions })

// UPDATE
await Model.updateOne({ filter }, { update })
await Model.updateMany({ filter }, { update })
await Model.findByIdAndUpdate(id, { update }, { new: true })
await Model.findOneAndUpdate({ filter }, { update }, { new: true })

// DELETE
await Model.deleteOne({ filter })
await Model.deleteMany({ filter })
await Model.findByIdAndDelete(id)
await Model.findOneAndDelete({ filter })
```

### Schema Type Shortcuts
```javascript
const schema = new mongoose.Schema({
    name: String,                    // type: String
    age: Number,                     // type: Number
    isActive: Boolean,               // type: Boolean
    createdAt: Date,                 // type: Date
    tags: [String],                  // array of strings
    meta: {                          // nested object
        likes: Number,
        views: Number
    }
});
```

---

## 📚 Next Steps

1. **Learn About:**
   - Mongoose middleware (pre/post hooks)
   - Population (working with references)
   - Aggregation pipeline
   - Transactions
   - Mongoose plugins

2. **Practice Projects:**
   - Build a complete Todo API with user authentication
   - Create a blog with posts, comments, and users
   - Build an e-commerce product catalog
   - Create a social media app with followers/following

3. **Advanced Topics:**
   - Query optimization
   - Indexing strategies
   - Schema design patterns
   - Testing with Mongoose
   - Deployment considerations

---

## 📖 Resources

- **Official Docs:** https://mongoosejs.com/docs/
- **MongoDB Docs:** https://www.mongodb.com/docs/
- **NPM Package:** https://www.npmjs.com/package/mongoose
- **Tutorial Video:** https://youtu.be/wgwo5hbY7SY

---

**Happy Coding! 🚀**

*Last Updated: February 2024*
*Tutorial: CodeWithHarry - Sigma Web Development Course #96*
