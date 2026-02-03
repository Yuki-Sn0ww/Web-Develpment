# EJS Template Engine - Complete Revision Notes

> **Author:** Harry's Web Development Tutorial  
> **Topic:** EJS (Embedded JavaScript) with Express.js  
> **Purpose:** Server-side templating for dynamic web pages

---

## Table of Contents
1. [Introduction - What is EJS?](#1-introduction---what-is-ejs)
2. [The Problem: Static vs Dynamic HTML](#2-the-problem-static-vs-dynamic-html)
3. [Installation and Setup](#3-installation-and-setup)
4. [Configuring Express for EJS](#4-configuring-express-for-ejs)
5. [EJS Syntax - The Three Tags](#5-ejs-syntax---the-three-tags)
6. [Passing Data from Server to Template](#6-passing-data-from-server-to-template)
7. [Partials - Reusable Components](#7-partials---reusable-components)
8. [Working with Arrays and Loops](#8-working-with-arrays-and-loops)
9. [Conditional Rendering](#9-conditional-rendering)
10. [Dynamic Routes with EJS](#10-dynamic-routes-with-ejs)
11. [Best Practices](#11-best-practices)
12. [Common Errors and Solutions](#12-common-errors-and-solutions)

---

## 1. Introduction - What is EJS?

### **Definition:**
EJS stands for **Embedded JavaScript**. It's a simple templating language that lets you generate HTML markup with plain JavaScript.

### **Why Use Template Engines?**
- **Dynamic Content:** Inject data from databases or APIs into HTML
- **Code Reusability:** Create reusable components (like navbars, footers)
- **Maintainability:** Update one template instead of thousands of HTML files
- **Logic in Templates:** Use loops, conditionals, and variables in HTML

### **Real-World Example:**
Think of Amazon - they don't create separate HTML files for each of the millions of products. They use ONE product template and inject different product data (name, price, image) dynamically.

---

## 2. The Problem: Static vs Dynamic HTML

### **❌ Static HTML Approach (Bad for Large Sites):**

```html
<!-- product1.html -->
<!DOCTYPE html>
<html>
<head><title>Nike Air Max</title></head>
<body>
    <h1>Nike Air Max</h1>
    <p>Price: $120</p>
</body>
</html>
```

```html
<!-- product2.html -->
<!DOCTYPE html>
<html>
<head><title>Adidas Superstar</title></head>
<body>
    <h1>Adidas Superstar</h1>
    <p>Price: $85</p>
</body>
</html>
```

**Problems:**
- If you have 10,000 products → 10,000 separate HTML files
- Want to update header/footer? Edit 10,000 files manually
- Impossible to manage data from databases
- No way to show user-specific content

### **✅ Dynamic EJS Approach (Scalable):**

```ejs
<!-- product.ejs - ONE template for ALL products -->
<!DOCTYPE html>
<html>
<head><title><%= productName %></title></head>
<body>
    <h1><%= productName %></h1>
    <p>Price: $<%= productPrice %></p>
</body>
</html>
```

```javascript
// Server sends different data for each product
app.get('/product/:id', (req, res) => {
    let product = database.getProduct(req.params.id);
    res.render('product', { 
        productName: product.name, 
        productPrice: product.price 
    });
});
```

**Benefits:**
- ONE template handles unlimited products
- Data comes from database/API
- Easy to update layout once for all pages
- User-specific content is simple

---

## 3. Installation and Setup

### **Step 1: Initialize Node.js Project**

```bash
npm init -y
```

**What this does:**
- Creates `package.json` file
- `-y` flag accepts all default settings automatically

### **Step 2: Install Express Framework**

```bash
npm install express
```

**What this does:**
- Installs Express.js (web framework for Node.js)
- Allows you to create routes, handle requests, serve pages

### **Step 3: Install EJS Template Engine**

```bash
npm install ejs
```

**What this does:**
- Adds EJS package to your project
- Enables template rendering capabilities

### **Step 4: Create Project Structure**

```
your-project/
│
├── node_modules/          # Installed packages (auto-generated)
├── views/                 # ⭐ EJS templates go here (MUST be named 'views')
│   ├── index.ejs         # Homepage template
│   ├── blogpost.ejs      # Blog post template
│   ├── navbar.ejs        # Navbar partial (reusable)
│   └── footer.ejs        # Footer partial (reusable)
│
├── public/               # Static files (CSS, images, JS - optional)
│   ├── css/
│   └── images/
│
├── index.js              # Main server file
├── package.json          # Project dependencies
└── package-lock.json     # Locked versions (auto-generated)
```

**⚠️ Critical Rule:** EJS files MUST be in a folder named `views/` (Express default). You can change this, but `views/` is standard.

### **Step 5: Rename HTML Files to .ejs**

```bash
# Before
index.html → views/index.ejs
blog.html  → views/blogpost.ejs
```

**Why?** EJS files use `.ejs` extension so Express knows to process them as templates.

---

## 4. Configuring Express for EJS

### **Complete index.js Setup:**

```javascript
// Step 1: Import Express
const express = require('express');
const app = express();
const port = 3000;

// Step 2: Tell Express to use EJS as the template engine
app.set('view engine', 'ejs');

// Step 3: (Optional) Tell Express where templates are located
// Not needed if using default 'views' folder
// app.set('views', './my-custom-folder');

// Step 4: Create routes
app.get('/', (req, res) => {
    // res.sendFile() ❌ Don't use this anymore for templates
    // res.render() ✅ Use this for EJS files
    res.render('index');
});

// Step 5: Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

### **Key Methods:**

| Method | Purpose | When to Use |
|--------|---------|-------------|
| `app.set('view engine', 'ejs')` | Configures EJS | Once at the start |
| `res.sendFile('index.html')` | Sends static HTML | For plain HTML files |
| `res.render('index')` | Renders EJS template | For dynamic EJS files |
| `res.render('index', {data})` | Renders with data | Most common usage |

---

## 5. EJS Syntax - The Three Tags

### **🔷 Tag 1: Output Tag `<%= %>`**

**Purpose:** Print/display a variable's value (HTML-escaped for security)

**Syntax:**
```ejs
<%= variableName %>
```

**Example 1: Simple Text**
```javascript
// index.js
app.get('/', (req, res) => {
    res.render('index', { userName: 'John Doe' });
});
```

```ejs
<!-- index.ejs -->
<h1>Welcome, <%= userName %>!</h1>
```

**Browser Output:**
```html
<h1>Welcome, John Doe!</h1>
```

**Example 2: Using in Attributes**
```ejs
<input type="text" placeholder="<%= searchText %>" />
<img src="<%= imageURL %>" alt="<%= imageAlt %>">
<a href="/user/<%= userId %>">Profile</a>
```

**Example 3: Accessing Object Properties**
```javascript
res.render('index', { 
    user: { name: 'Alice', age: 25, city: 'NYC' } 
});
```

```ejs
<p>Name: <%= user.name %></p>
<p>Age: <%= user.age %></p>
<p>City: <%= user.city %></p>
```

**Example 4: Array Access**
```javascript
res.render('index', { colors: ['red', 'green', 'blue'] });
```

```ejs
<p>First color: <%= colors[0] %></p>
<p>Second color: <%= colors[1] %></p>
```

**⚠️ Security Note:** `<%= %>` automatically escapes HTML, preventing XSS attacks:
```javascript
res.render('index', { userInput: '<script>alert("hack")</script>' });
```

```ejs
<p><%= userInput %></p>
```

**Safe Output:**
```html
<p>&lt;script&gt;alert("hack")&lt;/script&gt;</p>
```

---

### **🔷 Tag 2: Scriptlet Tag `<% %>`**

**Purpose:** Execute JavaScript code WITHOUT printing anything (for logic like loops, conditionals)

**Syntax:**
```ejs
<% JavaScript code here %>
```

**Example 1: Simple Loop**
```ejs
<ul>
    <% for(let i = 1; i <= 5; i++) { %>
        <li>Item number <%= i %></li>
    <% } %>
</ul>
```

**Browser Output:**
```html
<ul>
    <li>Item number 1</li>
    <li>Item number 2</li>
    <li>Item number 3</li>
    <li>Item number 4</li>
    <li>Item number 5</li>
</ul>
```

**Example 2: Loop Through Array**
```javascript
res.render('index', { 
    fruits: ['Apple', 'Banana', 'Orange'] 
});
```

```ejs
<ul>
    <% fruits.forEach(function(fruit) { %>
        <li><%= fruit %></li>
    <% }); %>
</ul>
```

**Modern ES6 Syntax:**
```ejs
<ul>
    <% fruits.forEach(fruit => { %>
        <li><%= fruit %></li>
    <% }) %>
</ul>
```

**Example 3: If-Else Statements**
```javascript
res.render('index', { isLoggedIn: true, userName: 'Alice' });
```

```ejs
<% if(isLoggedIn) { %>
    <p>Welcome back, <%= userName %>!</p>
    <a href="/logout">Logout</a>
<% } else { %>
    <p>Please log in</p>
    <a href="/login">Login</a>
<% } %>
```

**Example 4: Complex Logic**
```javascript
res.render('index', { 
    score: 85,
    items: ['Book', 'Pen', 'Notebook']
});
```

```ejs
<% 
let grade;
if(score >= 90) grade = 'A';
else if(score >= 80) grade = 'B';
else if(score >= 70) grade = 'C';
else grade = 'F';
%>

<p>Your grade is: <%= grade %></p>

<% if(items.length > 0) { %>
    <p>You have <%= items.length %> items</p>
<% } %>
```

---

### **🔷 Tag 3: Unescaped Output Tag `<%- %>`**

**Purpose:** Render raw HTML without escaping (used for including partials or trusted HTML)

**Syntax:**
```ejs
<%- variableName %>
```

**⚠️ Danger:** This does NOT escape HTML, so only use with trusted content!

**Example 1: Including Partials (Most Common Use)**
```ejs
<!DOCTYPE html>
<html>
<body>
    <%- include('partials/navbar') %>
    <h1>Main Content</h1>
    <%- include('partials/footer') %>
</body>
</html>
```

**Example 2: Rendering HTML from Database**
```javascript
res.render('blog', { 
    content: '<p>This is <strong>bold</strong> text</p>' 
});
```

```ejs
<!-- ❌ With <%= %> (escaped - shows HTML code) -->
<div><%= content %></div>
<!-- Output: &lt;p&gt;This is &lt;strong&gt;bold&lt;/strong&gt; text&lt;/p&gt; -->

<!-- ✅ With <%- %> (unescaped - renders HTML) -->
<div><%- content %></div>
<!-- Output: <p>This is <strong>bold</strong> text</p> -->
```

**Security Warning:**
```javascript
// ⚠️ DANGEROUS - User input could contain malicious scripts
res.render('page', { userComment: req.body.comment });
```

```ejs
<!-- ❌ NEVER DO THIS - Opens XSS vulnerability -->
<div><%- userComment %></div>

<!-- ✅ SAFE - Escapes malicious code -->
<div><%= userComment %></div>
```

---

### **📋 Quick Reference Table:**

| Tag | Syntax | Purpose | Output? | Escapes HTML? |
|-----|--------|---------|---------|---------------|
| Output | `<%= var %>` | Display variable value | ✅ Yes | ✅ Yes (safe) |
| Scriptlet | `<% code %>` | Run JavaScript logic | ❌ No | N/A |
| Unescaped | `<%- html %>` | Render raw HTML | ✅ Yes | ❌ No (dangerous) |

---

## 6. Passing Data from Server to Template

### **Basic Concept:**
The server (index.js) sends data → EJS template receives it → Browser displays final HTML

### **Step-by-Step Example:**

**Step 1: Server Sends Data (index.js)**
```javascript
app.get('/', (req, res) => {
    // Create variables with data
    let siteName = "Adidas";
    let searchText = "Search Now";
    let arr = ["Hey", 54, 65];
    
    // Send to template as object
    res.render("index", { 
        siteName: siteName,      // Long form
        searchText: searchText,
        arr: arr
    });
});
```

**ES6 Shorthand (when variable name = key name):**
```javascript
app.get('/', (req, res) => {
    let siteName = "Adidas";
    let searchText = "Search Now";
    let arr = ["Hey", 54, 65];
    
    // Shorthand syntax (more modern)
    res.render("index", { siteName, searchText, arr });
});
```

**Step 2: Template Receives Data (index.ejs)**
```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= siteName %> - Official Site</title>
</head>
<body>
    <h1>Welcome to <%= siteName %></h1>
    <input type="text" placeholder="<%= searchText %>">
    
    <p>First array item: <%= arr[0] %></p>
    <p>Second array item: <%= arr[1] %></p>
    <p>Third array item: <%= arr[2] %></p>
</body>
</html>
```

**Step 3: Browser Receives Final HTML**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Adidas - Official Site</title>
</head>
<body>
    <h1>Welcome to Adidas</h1>
    <input type="text" placeholder="Search Now">
    
    <p>First array item: Hey</p>
    <p>Second array item: 54</p>
    <p>Third array item: 65</p>
</body>
</html>
```

### **Advanced Examples:**

**Example 1: Passing Objects**
```javascript
app.get('/profile', (req, res) => {
    let user = {
        name: 'John Smith',
        email: 'john@example.com',
        age: 28,
        isAdmin: false
    };
    
    res.render('profile', { user });
});
```

```ejs
<!-- profile.ejs -->
<h1><%= user.name %></h1>
<p>Email: <%= user.email %></p>
<p>Age: <%= user.age %></p>

<% if(user.isAdmin) { %>
    <button>Admin Panel</button>
<% } %>
```

**Example 2: Passing Arrays of Objects**
```javascript
app.get('/products', (req, res) => {
    let products = [
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Phone', price: 699 },
        { id: 3, name: 'Tablet', price: 399 }
    ];
    
    res.render('products', { products });
});
```

```ejs
<!-- products.ejs -->
<h1>Our Products</h1>
<div class="product-list">
    <% products.forEach(product => { %>
        <div class="product-card">
            <h2><%= product.name %></h2>
            <p>$<%= product.price %></p>
            <a href="/product/<%= product.id %>">View Details</a>
        </div>
    <% }) %>
</div>
```

**Example 3: Multiple Data Types**
```javascript
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        userName: 'Alice',
        notifications: 5,
        tasks: ['Buy milk', 'Call John', 'Finish report'],
        stats: { views: 1200, likes: 85, comments: 23 },
        isOnline: true
    });
});
```

```ejs
<!-- dashboard.ejs -->
<title><%= pageTitle %></title>

<h1>Welcome, <%= userName %>!</h1>

<% if(isOnline) { %>
    <span class="status online">🟢 Online</span>
<% } %>

<div class="notifications">
    You have <%= notifications %> new notifications
</div>

<div class="stats">
    <p>Views: <%= stats.views %></p>
    <p>Likes: <%= stats.likes %></p>
    <p>Comments: <%= stats.comments %></p>
</div>

<h2>Your Tasks (<%= tasks.length %>)</h2>
<ul>
    <% tasks.forEach((task, index) => { %>
        <li>Task <%= index + 1 %>: <%= task %></li>
    <% }) %>
</ul>
```

---

## 7. Partials - Reusable Components

### **What Are Partials?**
Partials are small, reusable pieces of EJS code (like navbar, footer, sidebar) that you include in multiple pages.

### **Why Use Partials?**

**❌ Without Partials (Bad):**
```ejs
<!-- page1.ejs - 200 lines -->
<nav>
    <!-- 50 lines of navbar code -->
</nav>
<main>Page 1 content</main>
<footer>
    <!-- 30 lines of footer code -->
</footer>
```

```ejs
<!-- page2.ejs - 200 lines -->
<nav>
    <!-- Same 50 lines COPIED AGAIN -->
</nav>
<main>Page 2 content</main>
<footer>
    <!-- Same 30 lines COPIED AGAIN -->
</footer>
```

**Problem:** If you have 100 pages and need to update navbar → edit 100 files! 😱

**✅ With Partials (Good):**
```ejs
<!-- views/partials/navbar.ejs - 50 lines -->
<nav>
    <!-- navbar code here ONCE -->
</nav>
```

```ejs
<!-- page1.ejs - 10 lines -->
<%- include('partials/navbar') %>
<main>Page 1 content</main>
<%- include('partials/footer') %>
```

```ejs
<!-- page2.ejs - 10 lines -->
<%- include('partials/navbar') %>
<main>Page 2 content</main>
<%- include('partials/footer') %>
```

**Benefit:** Update navbar once → all 100 pages update automatically! 🎉

---

### **Creating and Using Partials:**

**Step 1: Create Partials Folder**
```
views/
├── partials/
│   ├── navbar.ejs
│   ├── footer.ejs
│   └── head.ejs
├── index.ejs
└── about.ejs
```

**Step 2: Create navbar.ejs Partial**
```ejs
<!-- views/partials/navbar.ejs -->
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/"><%= siteName %></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" 
                       placeholder="<%= searchText %>" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
```

**Step 3: Create footer.ejs Partial**
```ejs
<!-- views/partials/footer.ejs -->
<footer class="bg-dark text-white text-center py-4 mt-5">
    <div class="container">
        <p>&copy; 2024 <%= siteName %>. All rights reserved.</p>
        <div class="social-links">
            <a href="#" class="text-white mx-2">Facebook</a>
            <a href="#" class="text-white mx-2">Twitter</a>
            <a href="#" class="text-white mx-2">Instagram</a>
        </div>
    </div>
</footer>
```

**Step 4: Create head.ejs Partial (for <head> section)**
```ejs
<!-- views/partials/head.ejs -->
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= pageTitle %> | <%= siteName %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet">
</head>
```

**Step 5: Include Partials in Main Pages**
```ejs
<!-- views/index.ejs -->
<!doctype html>
<html lang="en">
<%- include('partials/head') %>
<body>
    <%- include('partials/navbar') %>
    
    <div class="container mt-4">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content area.</p>
    </div>
    
    <%- include('partials/footer') %>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

**Step 6: Server Code**
```javascript
app.get('/', (req, res) => {
    res.render('index', {
        siteName: 'Adidas',
        searchText: 'Search products...',
        pageTitle: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        siteName: 'Adidas',
        searchText: 'Search products...',
        pageTitle: 'About Us'
    });
});
```

---

### **Advanced Partial Techniques:**

**Passing Variables to Partials:**

Partials automatically have access to all variables passed to the parent template!

```javascript
// index.js
app.get('/', (req, res) => {
    res.render('index', {
        siteName: 'MyStore',
        userName: 'John',
        cartItems: 3
    });
});
```

```ejs
<!-- navbar.ejs - Can access ALL variables from parent -->
<nav>
    <span>Welcome, <%= userName %>!</span>
    <span>Cart (<%= cartItems %>)</span>
</nav>
```

**Nested Partials:**
```ejs
<!-- views/partials/header.ejs -->
<%- include('navbar') %>
<%- include('search-bar') %>
```

```ejs
<!-- views/index.ejs -->
<%- include('partials/header') %>
<!-- This includes both navbar AND search-bar -->
```

---

## 8. Working with Arrays and Loops

### **Example 1: Simple Array Loop**

```javascript
// index.js
app.get('/colors', (req, res) => {
    let colors = ['Red', 'Green', 'Blue', 'Yellow'];
    res.render('colors', { colors });
});
```

```ejs
<!-- colors.ejs -->
<h2>Available Colors:</h2>
<ul>
    <% colors.forEach(color => { %>
        <li><%= color %></li>
    <% }) %>
</ul>
```

**Output:**
```html
<ul>
    <li>Red</li>
    <li>Green</li>
    <li>Blue</li>
    <li>Yellow</li>
</ul>
```

---

### **Example 2: Loop with Index**

```javascript
app.get('/tasks', (req, res) => {
    let tasks = ['Buy groceries', 'Call mom', 'Finish project'];
    res.render('tasks', { tasks });
});
```

```ejs
<!-- tasks.ejs -->
<h2>My Tasks</h2>
<ol>
    <% tasks.forEach((task, index) => { %>
        <li>Task #<%= index + 1 %>: <%= task %></li>
    <% }) %>
</ol>
```

**Output:**
```html
<ol>
    <li>Task #1: Buy groceries</li>
    <li>Task #2: Call mom</li>
    <li>Task #3: Finish project</li>
</ol>
```

---

### **Example 3: Array of Objects (Most Common)**

```javascript
app.get('/products', (req, res) => {
    let products = [
        { id: 1, name: 'Laptop', price: 999, inStock: true },
        { id: 2, name: 'Phone', price: 699, inStock: false },
        { id: 3, name: 'Tablet', price: 399, inStock: true }
    ];
    res.render('products', { products });
});
```

```ejs
<!-- products.ejs -->
<h1>Product Catalog</h1>
<div class="row">
    <% products.forEach(product => { %>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><%= product.name %></h5>
                    <p class="card-text">$<%= product.price %></p>
                    
                    <% if(product.inStock) { %>
                        <span class="badge bg-success">In Stock</span>
                        <button class="btn btn-primary">Buy Now</button>
                    <% } else { %>
                        <span class="badge bg-danger">Out of Stock</span>
                        <button class="btn btn-secondary" disabled>Unavailable</button>
                    <% } %>
                </div>
            </div>
        </div>
    <% }) %>
</div>
```

---

### **Example 4: Traditional For Loop**

```ejs
<!-- Generating numbered items -->
<ul>
    <% for(let i = 1; i <= 5; i++) { %>
        <li>Item number <%= i %></li>
    <% } %>
</ul>
```

---

### **Example 5: Handling Empty Arrays**

```javascript
app.get('/notifications', (req, res) => {
    let notifications = []; // Empty array
    res.render('notifications', { notifications });
});
```

```ejs
<!-- notifications.ejs -->
<h2>Notifications</h2>

<% if(notifications.length > 0) { %>
    <ul>
        <% notifications.forEach(notification => { %>
            <li><%= notification %></li>
        <% }) %>
    </ul>
<% } else { %>
    <p class="text-muted">No new notifications</p>
<% } %>
```

---

### **Example 6: Advanced - Nested Loops**

```javascript
app.get('/menu', (req, res) => {
    let menu = [
        {
            category: 'Appetizers',
            items: ['Spring Rolls', 'Soup', 'Salad']
        },
        {
            category: 'Main Course',
            items: ['Pasta', 'Steak', 'Fish']
        }
    ];
    res.render('menu', { menu });
});
```

```ejs
<!-- menu.ejs -->
<% menu.forEach(section => { %>
    <h3><%= section.category %></h3>
    <ul>
        <% section.items.forEach(item => { %>
            <li><%= item %></li>
        <% }) %>
    </ul>
<% }) %>
```

**Output:**
```html
<h3>Appetizers</h3>
<ul>
    <li>Spring Rolls</li>
    <li>Soup</li>
    <li>Salad</li>
</ul>

<h3>Main Course</h3>
<ul>
    <li>Pasta</li>
    <li>Steak</li>
    <li>Fish</li>
</ul>
```

---

## 9. Conditional Rendering

### **Example 1: Simple If Statement**

```javascript
app.get('/profile', (req, res) => {
    res.render('profile', { isLoggedIn: true, userName: 'Alice' });
});
```

```ejs
<!-- profile.ejs -->
<% if(isLoggedIn) { %>
    <h1>Welcome back, <%= userName %>!</h1>
    <a href="/logout">Logout</a>
<% } else { %>
    <h1>Please log in</h1>
    <a href="/login">Login</a>
<% } %>
```

---

### **Example 2: If-Else-If Chain**

```javascript
app.get('/status', (req, res) => {
    res.render('status', { userRole: 'admin' });
});
```

```ejs
<!-- status.ejs -->
<% if(userRole === 'admin') { %>
    <div class="alert alert-danger">
        <strong>Admin Access Granted</strong>
        <a href="/admin">Go to Admin Panel</a>
    </div>
<% } else if(userRole === 'moderator') { %>
    <div class="alert alert-warning">
        <strong>Moderator Access</strong>
        <a href="/moderate">Moderate Content</a>
    </div>
<% } else { %>
    <div class="alert alert-info">
        <strong>Regular User</strong>
        <a href="/dashboard">My Dashboard</a>
    </div>
<% } %>
```

---

### **Example 3: Combining Conditions**

```javascript
app.get('/checkout', (req, res) => {
    res.render('checkout', {
        cartItems: 3,
        isLoggedIn: true,
        hasAddress: false
    });
});
```

```ejs
<!-- checkout.ejs -->
<h1>Checkout</h1>

<% if(cartItems === 0) { %>
    <p>Your cart is empty</p>
    <a href="/shop">Continue Shopping</a>
<% } else if(!isLoggedIn) { %>
    <p>Please log in to checkout</p>
    <a href="/login">Login</a>
<% } else if(!hasAddress) { %>
    <p>Please add a delivery address</p>
    <a href="/add-address">Add Address</a>
<% } else { %>
    <p>You have <%= cartItems %> items</p>
    <button class="btn btn-success">Place Order</button>
<% } %>
```

---

### **Example 4: Ternary Operator**

```ejs
<!-- Short conditional rendering -->
<span class="status <%= isOnline ? 'online' : 'offline' %>">
    <%= isOnline ? '🟢 Online' : '🔴 Offline' %>
</span>

<button class="btn <%= isPremium ? 'btn-gold' : 'btn-primary' %>">
    <%= isPremium ? 'Premium User' : 'Upgrade to Premium' %>
</button>
```

---

### **Example 5: Checking Array Length**

```ejs
<% if(notifications.length > 0) { %>
    <span class="badge bg-danger"><%= notifications.length %></span>
<% } %>

<% if(products.length === 0) { %>
    <p>No products found</p>
<% } %>
```

---

## 10. Dynamic Routes with EJS

### **Concept: URL Parameters**

Dynamic routes allow you to create one template that handles multiple URLs.

**Example URL Structure:**
- `/blog/how-to-learn-javascript`
- `/blog/best-programming-books`
- `/blog/web-development-tips`

Instead of creating 3 separate routes and files, use ONE dynamic route.

---

### **Example: Blog Post Route**

```javascript
// index.js
app.get('/blog/:slug', (req, res) => {
    // :slug is a URL parameter (can be anything)
    let slug = req.params.slug;
    
    // In real app, fetch from database using slug
    // For now, using dummy data
    let blogPosts = {
        'how-to-learn-javascript': {
            title: 'How to Learn JavaScript',
            content: 'JavaScript is a powerful language...',
            author: 'John Doe',
            date: '2024-01-15'
        },
        'best-programming-books': {
            title: 'Best Programming Books',
            content: 'Here are my top 10 books...',
            author: 'Jane Smith',
            date: '2024-02-01'
        }
    };
    
    let post = blogPosts[slug];
    
    if(post) {
        res.render('blogpost', {
            blogTitle: post.title,
            blogContent: post.content,
            blogAuthor: post.author,
            blogDate: post.date
        });
    } else {
        res.status(404).send('Blog post not found');
    }
});
```

```ejs
<!-- views/blogpost.ejs -->
<!doctype html>
<html lang="en">
<head>
    <title><%= blogTitle %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet">
</head>
<body>
    <%- include('partials/navbar') %>
    
    <div class="container mt-5">
        <article>
            <h1><%= blogTitle %></h1>
            <p class="text-muted">
                By <%= blogAuthor %> | <%= blogDate %>
            </p>
            <hr>
            <div class="content">
                <%= blogContent %>
            </div>
        </article>
    </div>
    
    <%- include('partials/footer') %>
</body>
</html>
```

**How it Works:**
1. User visits: `/blog/how-to-learn-javascript`
2. Express captures `slug = "how-to-learn-javascript"`
3. Server finds matching blog post
4. Renders `blogpost.ejs` with that post's data
5. User sees the blog post page

---

### **Example: Product Page**

```javascript
app.get('/product/:id', (req, res) => {
    let productId = req.params.id;
    
    // Simulating database fetch
    let products = {
        '1': { name: 'Laptop', price: 999, description: 'High-performance laptop' },
        '2': { name: 'Phone', price: 699, description: 'Latest smartphone' }
    };
    
    let product = products[productId];
    
    if(product) {
        res.render('product', {
            productName: product.name,
            productPrice: product.price,
            productDescription: product.description
        });
    } else {
        res.status(404).send('Product not found');
    }
});
```

---

### **Multiple Parameters:**

```javascript
app.get('/user/:userId/post/:postId', (req, res) => {
    let userId = req.params.userId;
    let postId = req.params.postId;
    
    res.render('userpost', { userId, postId });
});
```

**URL:** `/user/123/post/456`
- `userId = "123"`
- `postId = "456"`

---

## 11. Best Practices

### **✅ DO:**

1. **Use Descriptive Variable Names**
```javascript
// ✅ Good
res.render('index', { userName, productList, isAuthenticated });

// ❌ Bad
res.render('index', { u, p, a });
```

2. **Keep Logic Minimal in Templates**
```ejs
<!-- ❌ Bad - Complex logic in template -->
<% 
let total = 0;
items.forEach(item => {
    total += item.price * item.quantity;
});
let tax = total * 0.1;
let finalPrice = total + tax;
%>
<p>Total: $<%= finalPrice %></p>

<!-- ✅ Good - Calculate in server -->
<p>Total: $<%= finalPrice %></p>
```

```javascript
// Server calculates everything
app.get('/cart', (req, res) => {
    let total = calculateTotal(items);
    let tax = total * 0.1;
    let finalPrice = total + tax;
    
    res.render('cart', { finalPrice });
});
```

3. **Use Partials for Repeated Code**
```ejs
<!-- ✅ Good -->
<%- include('partials/product-card', { product }) %>

<!-- ❌ Bad - Copying same code everywhere -->
```

4. **Handle Missing Data Gracefully**
```ejs
<!-- ✅ Good -->
<h1><%= userName || 'Guest' %></h1>

<% if(products && products.length > 0) { %>
    <!-- Show products -->
<% } else { %>
    <p>No products available</p>
<% } %>
```

5. **Use Comments for Complex Logic**
```ejs
<% // Calculate user's tier based on points %>
<% let tier = userPoints > 1000 ? 'Gold' : 'Silver'; %>
```

---

### **❌ DON'T:**

1. **Don't Put Business Logic in Templates**
```ejs
<!-- ❌ Bad - Database queries in template -->
<% let users = database.getUsers(); %>

<!-- ✅ Good - Do this in server -->
```

2. **Don't Hardcode Values**
```ejs
<!-- ❌ Bad -->
<title>Adidas Store</title>

<!-- ✅ Good -->
<title><%= siteName %></title>
```

3. **Don't Use <%- %> for User Input**
```ejs
<!-- ❌ DANGEROUS - XSS vulnerability -->
<div><%- userComment %></div>

<!-- ✅ SAFE -->
<div><%= userComment %></div>
```

4. **Don't Create Deeply Nested Loops**
```ejs
<!-- ❌ Bad - Hard to read -->
<% categories.forEach(cat => { %>
    <% cat.products.forEach(prod => { %>
        <% prod.reviews.forEach(review => { %>
            <!-- Too deep! -->
        <% }) %>
    <% }) %>
<% }) %>

<!-- ✅ Good - Flatten data structure in server -->
```

---

## 12. Common Errors and Solutions

### **Error 1: "Cannot find module 'ejs'"**

**Cause:** EJS not installed

**Solution:**
```bash
npm install ejs
```

---

### **Error 2: "Failed to lookup view 'index' in views directory"**

**Cause:** Template file not in `views/` folder or wrong name

**Solution:**
- Make sure file is `views/index.ejs` (not `index.ejs` in root)
- Check exact spelling (case-sensitive on Linux)
- Restart server after creating new files

---

### **Error 3: "variableName is not defined"**

**Cause:** Template uses a variable that wasn't passed from server

```ejs
<!-- template.ejs -->
<h1><%= userName %></h1>
```

```javascript
// ❌ Server didn't send userName
app.get('/', (req, res) => {
    res.render('template'); // Missing data!
});

// ✅ Fixed
app.get('/', (req, res) => {
    res.render('template', { userName: 'Alice' });
});
```

**Alternative Solution (Default Values):**
```ejs
<h1><%= typeof userName !== 'undefined' ? userName : 'Guest' %></h1>
<!-- OR -->
<h1><%= userName || 'Guest' %></h1>
```

---

### **Error 4: "Unexpected token" in EJS**

**Cause:** Syntax error in EJS tags

```ejs
<!-- ❌ Wrong -->
<% if(isLoggedIn) %>
    <p>Welcome</p>
<% } %>

<!-- ✅ Correct -->
<% if(isLoggedIn) { %>
    <p>Welcome</p>
<% } %>
```

---

### **Error 5: HTML Shows Literal `<%= userName %>`**

**Cause:** File has `.html` extension instead of `.ejs`

**Solution:**
```bash
# Rename file
mv views/index.html views/index.ejs
```

---

### **Error 6: "Cannot GET /route"**

**Cause:** No route defined in server

```javascript
// ❌ Missing route
app.listen(3000);

// ✅ Add route
app.get('/about', (req, res) => {
    res.render('about');
});
```

---

## 📚 Complete Working Example

### **Final Project Structure:**
```
my-ejs-project/
│
├── views/
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   └── blogpost.ejs
│
├── index.js
├── package.json
└── package-lock.json
```

### **Complete index.js:**
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Homepage Route
app.get('/', (req, res) => {
    res.render('index', {
        siteName: 'Adidas',
        searchText: 'Search products...',
        pageTitle: 'Home',
        products: [
            { id: 1, name: 'Sneakers', price: 120 },
            { id: 2, name: 'T-Shirt', price: 35 },
            { id: 3, name: 'Backpack', price: 80 }
        ]
    });
});

// About Page Route
app.get('/about', (req, res) => {
    res.render('about', {
        siteName: 'Adidas',
        searchText: 'Search products...',
        pageTitle: 'About Us'
    });
});

// Dynamic Blog Route
app.get('/blog/:slug', (req, res) => {
    res.render('blogpost', {
        siteName: 'Adidas',
        searchText: 'Search products...',
        blogTitle: 'Adidas: Why and When?',
        blogContent: 'It\'s a very good brand with rich history...',
        blogAuthor: 'Harry',
        blogDate: '2024-01-15'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

### **views/index.ejs:**
```ejs
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><%= pageTitle %> | <%= siteName %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
          rel="stylesheet">
</head>
<body>
    <%- include('partials/navbar') %>
    
    <div class="container mt-5">
        <h1>Welcome to <%= siteName %></h1>
        
        <h2 class="mt-4">Featured Products</h2>
        <div class="row">
            <% products.forEach(product => { %>
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><%= product.name %></h5>
                            <p class="card-text">$<%= product.price %></p>
                            <a href="/product/<%= product.id %>" class="btn btn-primary">
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
            <% }) %>
        </div>
    </div>
    
    <%- include('partials/footer') %>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 🎯 Quick Reference Cheat Sheet

| Task | Code |
|------|------|
| Install EJS | `npm install ejs` |
| Set view engine | `app.set('view engine', 'ejs')` |
| Render template | `res.render('filename', { data })` |
| Output variable | `<%= variableName %>` |
| Run JavaScript | `<% code %>` |
| Include partial | `<%- include('partials/name') %>` |
| Loop array | `<% arr.forEach(item => { %>...<% }) %>` |
| If statement | `<% if(condition) { %>...<% } %>` |
| Access URL param | `req.params.paramName` |

---

## 🎓 Practice Exercises

1. **Exercise 1:** Create a website with navbar, footer, and 3 pages (home, about, contact)
2. **Exercise 2:** Build a product listing page that loops through 10 products
3. **Exercise 3:** Create a blog with dynamic routes (`/blog/:slug`)
4. **Exercise 4:** Make a user dashboard showing different content for admin vs regular users
5. **Exercise 5:** Build a todo list that renders tasks from an array

---

## 📖 Summary

**What You Learned:**
- ✅ EJS allows dynamic HTML generation
- ✅ Templates live in `views/` folder
- ✅ Three main EJS tags: `<%= %>`, `<% %>`, `<%- %>`
- ✅ Pass data using `res.render('file', { data })`
- ✅ Partials make code reusable
- ✅ Loops and conditionals work in templates
- ✅ Dynamic routes use `:paramName` syntax

**Why EJS Matters:**
- Scales to thousands of pages with one template
- Separates data from presentation
- Makes websites maintainable
- Industry-standard for Node.js templating

---

**Happy Coding! 🚀**

*Last Updated: February 2024*
