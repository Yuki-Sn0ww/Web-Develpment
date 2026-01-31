# Advanced Express.js - Complete Revision Notes

**HTTP Methods, Routers, Response Types & Application Architecture**

---

## Table of Contents
1. [HTTP Methods - The Four Pillars of RESTful APIs](#1-http-methods---the-four-pillars-of-restful-apis)
2. [Request Chaining - Clean Code Organization](#2-request-chaining---clean-code-organization)
3. [Advanced Response Methods](#3-advanced-response-methods)
4. [Testing APIs with Postman](#4-testing-apis-with-postman)
5. [Express Router - Professional Code Organization](#5-express-router---professional-code-organization)
6. [Your Complete Code - Explained Line by Line](#6-your-complete-code---explained-line-by-line)
7. [Professional Project Structure](#7-professional-project-structure)
8. [Key Takeaways for Revision](#8-key-takeaways-for-revision)
9. [Common Mistakes to Avoid](#9-common-mistakes-to-avoid)
10. [Practice Exercises](#10-practice-exercises)
11. [Next Steps in Your Express Journey](#11-next-steps-in-your-express-journey)

---

## 1. HTTP Methods - The Four Pillars of RESTful APIs

HTTP methods define what action you want to perform on the server. Think of them as verbs in a sentence - they tell the server what to DO with the data.

### 1.1 GET - Retrieve Data

**Purpose:** Fetch/retrieve data from the server without modifying anything.

**Characteristics:**
- Default browser behavior (typing URL in browser = GET request)
- Data sent via URL (visible in address bar)
- Has character limits (~2000 characters in URL)
- Can be bookmarked and cached
- Should NOT be used for sensitive data (passwords visible in URL!)

**Example:**
```javascript
app.get('/', (req, res) => {
    console.log("Hey its a get request")
    res.send('Hello World!')
})
```

**Real-world use cases:** Viewing a blog post, searching products, loading a web page

---

### 1.2 POST - Create/Send Data

**Purpose:** Send data to the server to CREATE a new resource (e.g., new user, new blog post).

**Characteristics:**
- Data sent in request BODY (not visible in URL)
- NO character limits - can send large amounts of data
- Perfect for sensitive data (passwords, credit cards)
- Cannot be bookmarked
- Not cached by browsers

**Example:**
```javascript
app.post('/', (req, res) => {
    console.log("Hey its a post request")
    res.send('Data received and saved!')
})
```

**Real-world use cases:** User registration, login forms, creating a blog post, uploading files

---

### 1.3 PUT - Update Existing Data

**Purpose:** Update/replace an EXISTING resource on the server.

**Characteristics:**
- Modifies existing data
- Typically replaces the ENTIRE resource
- Idempotent (calling it multiple times has same effect as calling once)
- Data sent in request body

**Example:**
```javascript
app.put('/', (req, res) => {
    console.log("Hey its a put request")
    res.send('Data updated successfully!')
})
```

**Real-world use cases:** Editing user profile, updating a blog post, changing product details

---

### 1.4 DELETE - Remove Data

**Purpose:** Delete a resource from the server.

**Characteristics:**
- Removes data permanently
- Idempotent (deleting same resource multiple times has same result)
- Usually requires authentication/authorization

**Example:**
```javascript
app.delete('/user/:id', (req, res) => {
    console.log("Deleting user:", req.params.id)
    res.send('User deleted!')
})
```

**Real-world use cases:** Deleting a comment, removing items from cart, closing an account

---

## 2. Request Chaining - Clean Code Organization

Request chaining allows you to handle multiple HTTP methods for the SAME route in a cleaner, more organized way.

### 2.1 Without Chaining (Repetitive)

```javascript
app.get('/', (req, res) => {
    res.send('GET request')
})

app.post('/', (req, res) => {
    res.send('POST request')
})

app.put('/', (req, res) => {
    res.send('PUT request')
})
```

### 2.2 With Chaining (Clean & Organized)

```javascript
app.route('/')
    .get((req, res) => {
        res.send('GET request')
    })
    .post((req, res) => {
        res.send('POST request')
    })
    .put((req, res) => {
        res.send('PUT request')
    })
```

### Your Code Example (Hybrid Approach):

```javascript
app.get('/', (req, res) => {
    console.log("Hey its a get request")
    res.send('Hello World21!')
}).post('/', (req, res) => {  // Chained here
    console.log("Hey its a post request")
    res.send('Hello World post!')
})
```

**Benefits of Chaining:**
- Less code repetition
- All methods for one route are in one place
- Easier to read and maintain
- Professional code organization

---

## 3. Advanced Response Methods

Express provides multiple ways to send responses to clients. Each method is designed for specific use cases.

### 3.1 res.send() - General Response

Sends any type of response - text, HTML, or JSON. Express automatically sets the Content-Type header.

```javascript
res.send('Plain text')
res.send('<h1>HTML content</h1>')
res.send({ message: 'JSON object' })  // Auto-converted to JSON
```

### 3.2 res.sendFile() - Serve HTML Files

Sends an actual HTML file to the client. Perfect for serving static pages.

**CRITICAL:** Must provide absolute path or use root option!

```javascript
app.get("/index", (req, res) => {
    // __dirname gives the absolute path to current directory
    res.sendFile('templates/index.html', { root: __dirname })
})
```

#### What is `__dirname`?

`__dirname` is a Node.js global variable that contains the absolute path to the directory containing the currently executing file.

**Example:**
```javascript
// If your file is at: /home/user/myapp/index.js
// Then __dirname = /home/user/myapp

res.sendFile('templates/index.html', { root: __dirname })
// Looks for: /home/user/myapp/templates/index.html
```

### 3.3 res.json() - Send JSON (For APIs)

THE most important method for building APIs. Sends data in JSON format, which is the standard for modern web development.

```javascript
app.get("/api", (req, res) => {
    res.json({ 
        a: 1, 
        b: 2, 
        c: 3, 
        d: 4, 
        name: ["harry", "jerry"] 
    })
})
```

**Why JSON?**
- Universal format understood by all programming languages
- Easy to parse in JavaScript, Python, Java, etc.
- Lightweight and efficient
- Perfect for APIs that need to work with mobile apps, frontend frameworks (React, Vue)

### 3.4 res.redirect() - Redirect to Another URL

Automatically sends the user to a different URL. The browser will make a new request to that URL.

```javascript
app.get('/old-page', (req, res) => {
    res.redirect('/new-page')  // User goes to /new-page
})

app.get('/google', (req, res) => {
    res.redirect('https://www.google.com')  // External redirect
})
```

**Use cases:** After login (redirect to dashboard), URL changes, moving to HTTPS, temporary maintenance pages

---

## 4. Testing APIs with Postman

### 4.1 Why Do We Need Postman?

**Problem:** Browsers can only easily make GET requests (by typing URLs or clicking links). To test POST, PUT, DELETE, you need a specialized tool.

**What is Postman?**  
Postman is an industry-standard API testing tool used by professional developers worldwide. It allows you to send any HTTP request and see the response.

### 4.2 Key Postman Features

- Send GET, POST, PUT, DELETE, PATCH requests easily
- Add headers, authentication, request bodies
- Save requests in Collections for reuse
- Test APIs before connecting frontend
- Share collections with team members
- Automate API testing

### 4.3 How to Use Postman - Step by Step

#### Step 1: Start Your Express Server
```bash
node index.js
# Server running on http://localhost:3000
```

#### Step 2: Open Postman
Download from https://www.postman.com and install

#### Step 3: Create a Request
1. Click "New" → "HTTP Request"
2. Select method (GET, POST, PUT, DELETE) from dropdown
3. Enter URL: `http://localhost:3000/`
4. Click "Send"
5. See response in the bottom panel

#### Step 4: Save to Collection
Click "Save" → Create new collection "My Express Tests" → Save request

### 4.4 Testing Your Code with Postman

Test these endpoints from your code:

- `GET http://localhost:3000/` → Returns "Hello World21!"
- `POST http://localhost:3000/` → Returns "Hello World post!"
- `PUT http://localhost:3000/` → Returns "Hello World put!"
- `GET http://localhost:3000/api` → Returns JSON data
- `GET http://localhost:3000/index` → Returns HTML file
- `GET http://localhost:3000/blog` → Returns "Blog home page"
- `GET http://localhost:3000/blog/about` → Returns "About blog"
- `GET http://localhost:3000/shop` → Returns "Shop home page"

---

## 5. Express Router - Professional Code Organization

### 5.1 The Problem: Messy Code

As your application grows, putting ALL routes in one main file becomes a nightmare:
- File becomes thousands of lines long
- Hard to find specific routes
- Difficult for teams to collaborate
- Merge conflicts in version control
- Mixing unrelated functionality

**Example of Messy Code:**
```javascript
// index.js - Everything in one file (BAD!)
app.get('/blog', ...)
app.get('/blog/about', ...)
app.get('/blog/post', ...)
app.get('/shop', ...)
app.get('/shop/cart', ...)
app.get('/shop/checkout', ...)
app.get('/user/profile', ...)
app.get('/user/settings', ...)
// ... 500 more routes!
```

### 5.2 The Solution: Express Router

Routers let you split routes into separate files based on functionality. Each router is like a mini-application.

**Benefits:**
- Organized by feature (blog, shop, users)
- Each file is small and manageable
- Teams can work on different routers simultaneously
- Easy to find and modify routes
- Professional, scalable architecture

### 5.3 How Router Works - Step by Step

#### Step 1: Create Router Files

Create a routes folder with separate files:
```
project/
├── index.js (main file)
└── routes/
    ├── blog.js
    └── shop.js
```

#### Step 2: Create Blog Router (routes/blog.js)

```javascript
const express = require('express')
const router = express.Router()  // Create router instance

// Define routes (notice: paths are relative to /blog)
router.get('/', (req, res) => {
  res.send('Blog home page')
})

router.get('/about', (req, res) => {
  res.send('About blog')
})

router.get('/blogpost/:slug', (req, res) => {
  res.send(`fetch the blogpost for ${req.params.slug}`)
})

module.exports = router  // Export for use in main file
```

#### Step 3: Create Shop Router (routes/shop.js)

```javascript
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Shop home page')
})

router.get('/about', (req, res) => {
  res.send('About shop')
})

module.exports = router
```

#### Step 4: Use Routers in Main File (index.js)

```javascript
const express = require('express')
const blog = require('./routes/blog')  // Import blog router
const shop = require('./routes/shop')  // Import shop router

const app = express()

// Mount routers
app.use('/blog', blog)  // All blog routes start with /blog
app.use('/shop', shop)  // All shop routes start with /shop

app.listen(3000)
```

### 5.4 Understanding Router Paths

This is CRITICAL to understand: Router paths are RELATIVE to where they are mounted.

**Key Insight:**  
When you write `app.use('/blog', blog)`, you're saying: "Any URL starting with /blog should be handled by the blog router." Inside blog.js, all paths are relative to /blog.

---

## 6. Your Complete Code - Explained Line by Line

### 6.1 Main File (index.js)

```javascript
const express = require('express')
const blog = require('./routes/blog')
const shop = require('./routes/shop')

const app = express()
const port = 3000
```
**Lines 1-6:** Import Express, routers, create app instance, set port

```javascript
app.use(express.static('public'))
```
**Line 7:** Serve static files from public folder (HTML, CSS, JS, images)

```javascript
app.use('/blog', blog)
app.use('/shop', shop)
```
**Lines 8-9:** Mount routers. All `/blog/*` URLs → blog.js, all `/shop/*` URLs → shop.js

```javascript
app.get('/', (req, res) => {
    console.log("Hey its a get request")
    res.send('Hello World21!')
}).post('/', (req, res) => {
    console.log("Hey its a post request")
    res.send('Hello World post!')
})
```
**Lines 10-15:** Handle GET and POST on root path using chaining

```javascript
app.put('/', (req, res) => {
    console.log("Hey its a put request")
    res.send('Hello World put!')
})
```
**Lines 16-19:** Handle PUT requests on root path

```javascript
app.get("/index", (req, res) => {
    console.log("Hey its index")
    res.sendFile('templates/index.html', { root: __dirname })
})
```
**Lines 20-23:** Serve HTML file from templates folder using absolute path

```javascript
app.get("/api", (req, res) => {
    res.json({ a: 1, b: 2, c: 3, d: 4, name: ["harry", "jerry"] })
})
```
**Lines 24-26:** API endpoint returning JSON data

```javascript
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
**Lines 27-29:** Start server on port 3000

### 6.2 Testing HTML File (public/test.html)

```javascript
async function testPost(){
    let a = await fetch("/", {method: "PUT"})
    let b = await a.text()
    console.log(b)
}
testPost()
```

This JavaScript code:
- Makes a PUT request to "/" when page loads
- Uses fetch API to send request
- Waits for response with await
- Converts response to text
- Logs it to console

**Result:** Console shows "Hello World put!"

---

## 7. Professional Project Structure

```
my-express-app/
├── index.js              # Main application file
├── package.json          # Dependencies
├── routes/               # Router files
│   ├── blog.js           # Blog-related routes
│   └── shop.js           # Shop-related routes
├── public/               # Static files (accessible to users)
│   ├── test.html
│   ├── css/
│   ├── js/
│   └── images/
└── templates/            # Server-side templates (NOT public)
    └── index.html
```

**Why This Structure?**
- Clear separation of concerns
- Easy to find files
- Scalable - can add more routers easily
- Public folder for client-accessible files
- Templates folder for server-side HTML
- Routes organized by feature

---

## 8. Key Takeaways for Revision

1. **GET** retrieves data, **POST** creates, **PUT** updates, **DELETE** removes - each has specific purposes
2. POST is safer than GET for sensitive data because data is in the body, not the URL
3. Request chaining (`.get().post()`) keeps code organized for the same route
4. `res.sendFile()` needs absolute path or `{root: __dirname}`
5. `res.json()` is THE method for building APIs - returns JSON format
6. Browsers can only easily do GET requests - use Postman to test POST/PUT/DELETE
7. Postman is an industry-standard tool for API testing before frontend integration
8. Express Router splits large apps into manageable, organized files
9. `app.use('/blog', blogRouter)` mounts router - all paths inside are relative
10. `__dirname` gives absolute path to current directory

---

## 9. Common Mistakes to Avoid

- ❌ Using GET for passwords/sensitive data (use POST instead)
- ❌ Forgetting `{root: __dirname}` in `res.sendFile()` → "Path must be absolute" error
- ❌ Not testing POST/PUT/DELETE because browser only shows GET results
- ❌ Putting all routes in one file instead of using routers
- ❌ Confusing router paths - remember they are RELATIVE to mount point
- ❌ Not using `module.exports` in router files
- ❌ Misspelling `req.params` as `res.params`

---

## 10. Practice Exercises

### Exercise 1: Create a User Router

Create `routes/user.js` with:
- `GET /user` → "User dashboard"
- `GET /user/profile` → "User profile page"
- `POST /user/register` → "User registered"
- `PUT /user/:id` → "User {id} updated"
- `DELETE /user/:id` → "User {id} deleted"

Mount it in index.js with `app.use('/user', userRouter)`

### Exercise 2: Build a TODO API

Create `routes/todo.js` that returns JSON:
- `GET /todo` → List all todos (JSON array)
- `POST /todo` → Add new todo
- `PUT /todo/:id` → Update todo
- `DELETE /todo/:id` → Delete todo

Test all routes in Postman and save to a collection

### Exercise 3: File Serving Practice

Create routes that serve different HTML files from templates folder using `res.sendFile()`

---

## 11. Next Steps in Your Express Journey

- Learn middleware in depth (authentication, logging, error handling)
- Parse request bodies with `express.json()` and `express.urlencoded()`
- Connect to databases (MongoDB with Mongoose, PostgreSQL)
- Implement authentication (JWT, sessions, OAuth)
- Add validation (express-validator)
- Error handling and custom error pages
- Deploy to production (Heroku, AWS, DigitalOcean)
- Build a full REST API with CRUD operations

---

**You're learning professional web development! Keep practicing!** 🚀💻
