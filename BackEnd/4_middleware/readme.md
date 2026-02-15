# Express.js Middlewares - Complete Guide

## 📌 What is Middleware?

**Middleware** functions are functions that have access to:
- The **Request object** (`req`)
- The **Response object** (`res`)
- The **next middleware function** (`next`)

### Key Definition:
> Middleware acts as a "gatekeeper" or checkpoint that a request must pass through before reaching the final route handler.

---

## 🎯 Core Concepts

### 1. **The Request-Response Cycle**

```
Client Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

Each middleware can:
- Execute any code
- Modify request and response objects
- End the request-response cycle
- Call the next middleware in the stack

---

## ⚙️ The `next()` Function

The `next()` function is **critical** for the middleware chain to work properly.

### Rules:
1. If middleware **doesn't send a response**, it **MUST** call `next()`
2. Failing to call `next()` will leave the request "hanging"
3. Browser will eventually timeout if `next()` is not called

### Example:

```javascript
// ❌ BAD - Request will hang
app.use((req, res, next) => {
    console.log('Middleware executed');
    // Missing next() - Request stuck!
});

// ✅ GOOD - Passes control to next middleware
app.use((req, res, next) => {
    console.log('Middleware executed');
    next(); // Control moves to next middleware
});

// ✅ ALSO GOOD - Sends response (no next needed)
app.use((req, res, next) => {
    res.send('Response sent - no next needed');
});
```

---

## 💡 Practical Uses of Middleware

### 1. **Logging Requests**

Track when requests are made and what method was used:

```javascript
const fs = require('fs');

// Logging middleware
app.use((req, res, next) => {
    const log = `${Date.now()} - ${req.method} - ${req.url}\n`;
    
    // Log to console
    console.log(log);
    
    // Save to file
    fs.appendFileSync('logs.txt', log);
    
    next(); // Pass control to next middleware
});
```

**📖 Detailed Explanation:**

**What is `fs`?**
- **Point 1**: `fs` stands for "File System"
- **Point 2**: Built-in Node.js module (no installation needed)
- **Point 3**: Used to read/write files on your computer
- **Point 4**: Must import it: `const fs = require('fs');`

**What is `Date.now()`?**
- **Point 1**: Returns current timestamp in milliseconds
- **Point 2**: Milliseconds since January 1, 1970 (Unix epoch)
- **Point 3**: Example: `1738396800000`
- **Point 4**: Used for tracking when events happen
- **Point 5**: Can convert to readable date: `new Date(1738396800000)` → `2026-02-01...`

**What is `req.method`?**
- **Point 1**: HTTP method/verb used for the request
- **Point 2**: Common values: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- **Point 3**: **GET** = Fetch data (like viewing a page)
- **Point 4**: **POST** = Send data (like submitting a form)
- **Point 5**: **PUT** = Update entire resource
- **Point 6**: **DELETE** = Remove resource

**What is `req.url`?**
- **Point 1**: The URL path being requested
- **Point 2**: Example: If user visits `http://localhost:3000/about`, `req.url` = `/about`
- **Point 3**: Does NOT include domain name, only the path
- **Point 4**: Includes query parameters: `/search?q=hello` → `req.url` = `/search?q=hello`

**Breaking down the code:**

```javascript
app.use((req, res, next) => {
```
- **Point 1**: Defines middleware that runs on EVERY request
- **Point 2**: No path specified, so applies to all routes
- **Point 3**: Runs before any route handlers

```javascript
    const log = `${Date.now()} - ${req.method} - ${req.url}\n`;
```
- **Point 1**: Creates a log message string using template literals
- **Point 2**: `${...}` = Inserts variable values into string
- **Point 3**: Format: `timestamp - method - url`
- **Point 4**: `\n` = Newline character (starts new line in file)
- **Point 5**: Example result: `1738396800000 - GET - /about\n`

```javascript
    console.log(log);
```
- **Point 1**: Prints log to terminal/console
- **Point 2**: Helps developers see what's happening in real-time
- **Point 3**: Visible in terminal where you ran `node app.js`

```javascript
    fs.appendFileSync('logs.txt', log);
```
- **Point 1**: Writes log to a file named `logs.txt`
- **Point 2**: **appendFileSync** = Adds to END of file (doesn't overwrite)
- **Point 3**: **Sync** = Synchronous (waits for file write to complete)
- **Point 4**: Creates `logs.txt` if it doesn't exist
- **Point 5**: File will be in same folder as your app

```javascript
    next();
```
- **Point 1**: Passes control to next middleware/route
- **Point 2**: MUST call this or request will hang
- **Point 3**: Without `next()`, browser will keep loading forever

**logs.txt output:**
```
1738396800000 - GET - /
1738396801000 - POST - /about
1738396802000 - GET - /contact
1738396803000 - DELETE - /user/5
```

**Real-World Use Cases:**
- **Point 1**: Debug issues - see what routes are being hit
- **Point 2**: Track API usage - how many requests per day
- **Point 3**: Security - detect suspicious activity patterns
- **Point 4**: Performance - identify slow routes
- **Point 5**: Analytics - understand user behavior

---

### 2. **Modifying Request Object**

Add custom properties to `req` for use in later routes:

```javascript
// Add user information to request
app.use((req, res, next) => {
    req.user = "Harry";
    req.timestamp = Date.now();
    next();
});

// Access modified request in routes
app.get('/about', (req, res) => {
    res.send(`Hello ${req.user}!`); // Output: Hello Harry!
});
```

**📖 Detailed Explanation:**

**What is the Request Object (`req`)?**
- **Point 1**: JavaScript object that contains ALL information about the HTTP request
- **Point 2**: Created automatically by Express for every incoming request
- **Point 3**: Contains: headers, body, URL, method, cookies, etc.
- **Point 4**: You can ADD your own custom properties to it
- **Point 5**: Changes persist throughout the request-response cycle

**Why Modify the Request Object?**
- **Point 1**: Share data between middleware and routes
- **Point 2**: Avoid repeating same code in multiple routes
- **Point 3**: Store user info after authentication
- **Point 4**: Add computed values that multiple routes need
- **Point 5**: Attach database connections or utility functions

**Breaking down the code:**

```javascript
app.use((req, res, next) => {
```
- **Point 1**: Middleware that runs on every request
- **Point 2**: Executes BEFORE your route handlers
- **Point 3**: Purpose: Prepare/modify request object

```javascript
    req.user = "Harry";
```
- **Point 1**: Adds a NEW property `user` to the request object
- **Point 2**: `req` originally doesn't have a `user` property
- **Point 3**: Sets value to `"Harry"`
- **Point 4**: Property name can be ANYTHING: `req.user`, `req.currentUser`, `req.harry`, etc.
- **Point 5**: This value will be available in ALL subsequent middleware and routes

```javascript
    req.timestamp = Date.now();
```
- **Point 1**: Adds another custom property `timestamp`
- **Point 2**: Stores when the request was received
- **Point 3**: Useful for tracking request processing time
- **Point 4**: Multiple custom properties can be added

```javascript
    next();
```
- **Point 1**: Moves to next middleware/route
- **Point 2**: Custom properties remain available in next middleware

```javascript
app.get('/about', (req, res) => {
```
- **Point 1**: Route handler for `/about` page
- **Point 2**: Receives the SAME `req` object modified by middleware
- **Point 3**: Runs AFTER the middleware

```javascript
    res.send(`Hello ${req.user}!`);
```
- **Point 1**: Accesses `req.user` property added by middleware
- **Point 2**: Value is `"Harry"` (from middleware)
- **Point 3**: Template literal inserts value: `Hello Harry!`
- **Point 4**: Sends response to client

**Execution Flow:**

```
1. Client requests: GET /about

2. Middleware runs first:
   - Sets: req.user = "Harry"
   - Sets: req.timestamp = 1738396800000
   - Calls: next()

3. Route handler runs:
   - Accesses: req.user (value is "Harry")
   - Sends: "Hello Harry!"

4. Response sent to client
```

**Real-World Example - User Authentication:**

```javascript
// Authentication middleware
app.use((req, res, next) => {
    // Simulate getting user from database
    const userId = req.headers['user-id']; // Get from header
    
    if (userId) {
        // Fetch user from database (simplified)
        req.user = {
            id: userId,
            name: "Harry Potter",
            email: "harry@hogwarts.com",
            role: "admin"
        };
    }
    
    next();
});

// Multiple routes can now access req.user
app.get('/profile', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Please login');
    }
    res.json(req.user); // Send user data
});

app.get('/settings', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Please login');
    }
    res.send(`Settings for ${req.user.name}`);
});

app.get('/dashboard', (req, res) => {
    if (!req.user) {
        return res.status(401).send('Please login');
    }
    
    if (req.user.role !== 'admin') {
        return res.status(403).send('Admin only');
    }
    
    res.send('Admin Dashboard');
});
```

**Benefits of This Approach:**
- **Point 1**: Write authentication logic ONCE (in middleware)
- **Point 2**: Use `req.user` in ANY route without repeating code
- **Point 3**: Cleaner, more maintainable code
- **Point 4**: Easy to update user info in one place
- **Point 5**: Consistent user data across all routes

**What properties can `req` have?**

**Built-in properties:**
- `req.method` - HTTP method (GET, POST, etc.)
- `req.url` - Requested URL path
- `req.headers` - HTTP headers object
- `req.body` - Request body (needs body parser)
- `req.params` - URL parameters (e.g., `/user/:id`)
- `req.query` - Query string parameters (e.g., `?name=Harry`)
- `req.cookies` - Cookies (needs cookie parser)

**Custom properties YOU can add:**
- `req.user` - User information
- `req.timestamp` - Request time
- `req.isAuthenticated` - Boolean flag
- `req.db` - Database connection
- `req.harry` - Literally anything!
- `req.customData` - Any custom data

---

### 3. **Authentication Middleware**

Check if user is logged in before allowing access:

```javascript
// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // Check if user is logged in (example)
    if (req.headers.authorization === 'Bearer valid-token') {
        next(); // User authenticated, proceed
    } else {
        res.status(401).send('Unauthorized - Please login');
    }
};

// Protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send('Welcome to your dashboard!');
});

// Public route (no authentication needed)
app.get('/', (req, res) => {
    res.send('Public homepage');
});
```

**📖 Detailed Explanation:**

**What is `req.headers.authorization`?**
- **Headers**: Additional information sent with every HTTP request
- **authorization**: A specific header that contains login credentials/tokens
- **Example**: When you login to a website, your browser sends a token in this header with every request
- **How to see it**: Open browser DevTools → Network tab → Click any request → Headers section

**What is `'Bearer valid-token'`?**
- **Bearer**: A type of authentication scheme (like showing an ID card)
- **Token**: A secret string that proves you're logged in (like a password, but safer)
- **Format**: Always `Bearer <actual-token>`
- **Real example**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Breaking down the code:**

```javascript
const isAuthenticated = (req, res, next) => {
```
- **Point 1**: Creates a middleware function named `isAuthenticated`
- **Point 2**: This will check if user is logged in before allowing access to routes
- **Point 3**: Takes standard middleware parameters: `req`, `res`, `next`

```javascript
    if (req.headers.authorization === 'Bearer valid-token') {
```
- **Point 1**: Checks the `authorization` header from the request
- **Point 2**: `req.headers` = Object containing all HTTP headers sent by client
- **Point 3**: Compares if it matches `'Bearer valid-token'`
- **Point 4**: In real apps, `'valid-token'` would be replaced with actual token validation logic
- **Point 5**: This is a simplified example - real apps use JWT (JSON Web Tokens)

```javascript
        next(); // User authenticated, proceed
```
- **Point 1**: If token matches, user is authenticated
- **Point 2**: Calls `next()` to allow request to proceed to the route handler
- **Point 3**: Without `next()`, the route handler won't execute

```javascript
    } else {
        res.status(401).send('Unauthorized - Please login');
    }
```
- **Point 1**: If token doesn't match (or is missing), user is NOT authenticated
- **Point 2**: `res.status(401)` = Sets HTTP status code to 401
- **Point 3**: **401** means "Unauthorized" - you need to login
- **Point 4**: Sends error message to user
- **Point 5**: **Does NOT call `next()`** - request stops here, route handler never runs

```javascript
app.get('/dashboard', isAuthenticated, (req, res) => {
```
- **Point 1**: Protected route - requires authentication
- **Point 2**: `isAuthenticated` middleware runs BEFORE the route handler
- **Point 3**: If authentication fails, user never reaches this handler
- **Point 4**: Execution order: `isAuthenticated` → (if passes) → route handler

```javascript
    res.send('Welcome to your dashboard!');
});
```
- **Point 1**: Only executes if `isAuthenticated` called `next()`
- **Point 2**: User is logged in, so show them their dashboard

```javascript
app.get('/', (req, res) => {
    res.send('Public homepage');
});
```
- **Point 1**: Public route - NO authentication required
- **Point 2**: Notice there's no `isAuthenticated` middleware here
- **Point 3**: Anyone can access this route without logging in

**Real-World Example Flow:**

**Scenario 1: User NOT logged in**
```
1. User visits: GET /dashboard
2. isAuthenticated middleware runs
3. Checks: req.headers.authorization
4. Value: undefined (no token)
5. Condition fails: !== 'Bearer valid-token'
6. Response: 401 "Unauthorized - Please login"
7. next() NOT called
8. Route handler NEVER runs
9. User sees error message
```

**Scenario 2: User IS logged in**
```
1. User visits: GET /dashboard
2. Browser sends: authorization: 'Bearer valid-token'
3. isAuthenticated middleware runs
4. Checks: req.headers.authorization
5. Value: 'Bearer valid-token'
6. Condition passes: === 'Bearer valid-token'
7. Calls: next()
8. Route handler executes
9. Response: "Welcome to your dashboard!"
10. User sees dashboard
```

**How to test this in real app:**

Using **Postman** or **cURL**:
```bash
# Without token (will fail)
curl http://localhost:3000/dashboard

# With token (will succeed)
curl -H "Authorization: Bearer valid-token" http://localhost:3000/dashboard
```

Using **JavaScript fetch**:
```javascript
// Without token (will fail)
fetch('http://localhost:3000/dashboard');

// With token (will succeed)
fetch('http://localhost:3000/dashboard', {
    headers: {
        'Authorization': 'Bearer valid-token'
    }
});
```

---

### 4. **Error Handling**

```javascript
// Regular route with potential error
app.get('/user/:id', (req, res, next) => {
    const user = getUserById(req.params.id);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        next(error); // Pass error to error handler
    } else {
        res.json(user);
    }
});

// Error handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});
```

**📖 Detailed Explanation:**

**What is Error Handling?**
- **Point 1**: Catching problems that occur during request processing
- **Point 2**: Preventing server crashes
- **Point 3**: Sending meaningful error messages to users
- **Point 4**: Logging errors for debugging
- **Point 5**: Providing fallback responses when things go wrong

**What is `req.params.id`?**
- **Point 1**: URL parameters - dynamic values in the URL path
- **Point 2**: Defined using colon `:` in route path
- **Point 3**: Example: `/user/:id` where `:id` is a parameter
- **Point 4**: If URL is `/user/123`, then `req.params.id` = `"123"`
- **Point 5**: If URL is `/user/harry`, then `req.params.id` = `"harry"`
- **Point 6**: Always a STRING, even if it looks like a number

**What is `new Error()`?**
- **Point 1**: Creates a new Error object in JavaScript
- **Point 2**: Contains error message and stack trace
- **Point 3**: `new Error('message')` - message describes what went wrong
- **Point 4**: Built-in JavaScript feature (not Express-specific)
- **Point 5**: Can add custom properties: `error.status`, `error.code`, etc.

**What is `error.status = 404`?**
- **Point 1**: Adds custom property `status` to error object
- **Point 2**: **404** = HTTP status code for "Not Found"
- **Point 3**: Common status codes:
  - 200 = OK (success)
  - 400 = Bad Request (client error)
  - 401 = Unauthorized (need to login)
  - 403 = Forbidden (don't have permission)
  - 404 = Not Found (resource doesn't exist)
  - 500 = Internal Server Error (server problem)
- **Point 4**: Helps error handler send appropriate status code

**What is `next(error)`?**
- **Point 1**: Passing error to error-handling middleware
- **Point 2**: Different from regular `next()` (which has no argument)
- **Point 3**: **With argument**: `next(error)` → Skips all regular middleware, goes directly to error handler
- **Point 4**: **Without argument**: `next()` → Goes to next regular middleware
- **Point 5**: Critical for centralized error handling

**Breaking down the route:**

```javascript
app.get('/user/:id', (req, res, next) => {
```
- **Point 1**: Route with URL parameter `:id`
- **Point 2**: Three parameters: `req`, `res`, `next`
- **Point 3**: `next` is needed to pass errors to error handler

```javascript
    const user = getUserById(req.params.id);
```
- **Point 1**: Calls function to fetch user from database (example)
- **Point 2**: `getUserById()` would query database for user with this ID
- **Point 3**: Returns user object if found, `null` or `undefined` if not
- **Point 4**: This is a simplified example - real code would be async

```javascript
    if (!user) {
```
- **Point 1**: Checks if user was NOT found
- **Point 2**: `!user` = true if user is `null`, `undefined`, or `false`
- **Point 3**: Meaning: user doesn't exist in database

```javascript
        const error = new Error('User not found');
```
- **Point 1**: Creates new Error object
- **Point 2**: Message: `'User not found'`
- **Point 3**: This message will be sent to client

```javascript
        error.status = 404;
```
- **Point 1**: Adds `status` property to error
- **Point 2**: Sets to 404 (Not Found)
- **Point 3**: Error handler will use this status code

```javascript
        next(error);
```
- **Point 1**: Passes error to error-handling middleware
- **Point 2**: Skips remaining code in this route
- **Point 3**: Skips all regular middleware
- **Point 4**: Goes directly to error handler (the one with 4 parameters)

```javascript
    } else {
        res.json(user);
    }
```
- **Point 1**: Runs if user WAS found
- **Point 2**: `res.json()` sends JSON response
- **Point 3**: Converts JavaScript object to JSON string
- **Point 4**: Example response: `{"id": "123", "name": "Harry"}`

**Breaking down the error handler:**

```javascript
app.use((err, req, res, next) => {
```
- **Point 1**: Error-handling middleware - identified by **4 parameters**
- **Point 2**: **MUST have 4 parameters**, even if you don't use all of them
- **Point 3**: First parameter `err` = the error object
- **Point 4**: Must be defined LAST (after all routes and middleware)
- **Point 5**: Only runs when `next(error)` is called somewhere

**Why 4 parameters?**
- **Point 1**: Express identifies error handlers by parameter count
- **Point 2**: Regular middleware = 3 parameters `(req, res, next)`
- **Point 3**: Error middleware = 4 parameters `(err, req, res, next)`
- **Point 4**: Even if you don't use `next`, you MUST include it

```javascript
    console.error(err.stack);
```
- **Point 1**: Logs error details to console/terminal
- **Point 2**: `err.stack` = Stack trace (shows where error occurred)
- **Point 3**: Example stack trace:
  ```
  Error: User not found
      at /app/routes/user.js:15:20
      at Layer.handle [as handle_request]
      at next (/node_modules/express/lib/router/route.js:137:13)
  ```
- **Point 4**: Helps developers debug the problem
- **Point 5**: NOT sent to client (security risk)

```javascript
    res.status(err.status || 500)
```
- **Point 1**: Sets HTTP status code for response
- **Point 2**: `err.status` = Use status from error object (e.g., 404)
- **Point 3**: `|| 500` = If no status set, default to 500
- **Point 4**: 500 = Internal Server Error
- **Point 5**: Logical OR: uses first truthy value

```javascript
    .json({
        error: err.message || 'Internal Server Error'
    });
```
- **Point 1**: Sends JSON response to client
- **Point 2**: `err.message` = Error message (e.g., "User not found")
- **Point 3**: `|| 'Internal Server Error'` = Fallback if no message
- **Point 4**: Response format: `{"error": "User not found"}`
- **Point 5**: Client-friendly error message

**Complete Error Flow Example:**

```
1. Client requests: GET /user/999

2. Route handler runs:
   - Calls: getUserById("999")
   - Result: null (user doesn't exist)
   - Condition: !user → true
   - Creates: error = new Error('User not found')
   - Sets: error.status = 404
   - Calls: next(error)

3. Express skips all regular middleware

4. Error handler runs (4-parameter middleware):
   - Receives: err object
   - Logs: err.stack to console
   - Status: err.status (404)
   - Response: {"error": "User not found"}

5. Client receives:
   - Status: 404
   - Body: {"error": "User not found"}
```

**Without Error Handler (BAD):**
```javascript
app.get('/user/:id', (req, res) => {
    const user = getUserById(req.params.id);
    // If user is null, this will crash!
    res.json(user.name); // Error: Cannot read property 'name' of null
});
// Server crashes! 💥
```

**With Error Handler (GOOD):**
```javascript
app.get('/user/:id', (req, res, next) => {
    try {
        const user = getUserById(req.params.id);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        error.status = 404;
        next(error); // Error handled gracefully ✅
    }
});
```

**Real-World Error Handler:**
```javascript
app.use((err, req, res, next) => {
    // Log detailed error for developers
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    // Send user-friendly response
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Something went wrong',
        // Only show stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});
```

**Common Error Types:**
- **Validation errors**: User input is invalid → 400
- **Authentication errors**: User not logged in → 401
- **Authorization errors**: User lacks permission → 403
- **Not found errors**: Resource doesn't exist → 404
- **Server errors**: Database down, code bug → 500

---

## 🔧 Types of Middleware

### 1. **Application-Level Middleware**

Bound to the app object using `app.use()` or `app.METHOD()`:

```javascript
const express = require('express');
const app = express();

// Applies to ALL routes
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// Applies only to specific path
app.use('/user', (req, res, next) => {
    console.log('User route accessed');
    next();
});

// Applies to specific HTTP method
app.get('/about', (req, res, next) => {
    console.log('About page accessed');
    next();
});
```

---

### 2. **Router-Level Middleware**

Works like application-level but bound to `express.Router()`:

**File: routes/blog.js**
```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
    console.log('Blog router - Time:', Date.now());
    next();
});

// Define routes
router.get('/', (req, res) => {
    res.send('Blog home page');
});

router.get('/about', (req, res) => {
    res.send('About this blog');
});

module.exports = router;
```

**File: main.js**
```javascript
const express = require('express');
const app = express();
const blog = require('./routes/blog');

// Use blog router for /blog paths
app.use('/blog', blog);

// Now /blog and /blog/about are available
```

---

### 3. **Error-Handling Middleware**

Must have **four arguments**: `(err, req, res, next)`

```javascript
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
```

---

### 4. **Built-in Middleware**

Express provides several built-in middleware functions:

```javascript
// Serve static files from 'public' directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
```

**Usage Example:**
```javascript
// After using express.json()
app.post('/api/user', (req, res) => {
    console.log(req.body); // JSON parsed automatically
    res.json({ success: true, data: req.body });
});
```

---

### 5. **Third-Party Middleware**

Install and use middleware from npm:

```bash
npm install morgan cookie-parser cors
```

```javascript
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// HTTP request logger
app.use(morgan('dev'));

// Parse cookies
app.use(cookieParser());

// Enable CORS
app.use(cors());
```

---

## 📋 Complete Working Example with Detailed Explanation

### **File: main.js** (Full Code)

```javascript
const express = require('express');
const app = express();
const port = 3000;
const blog = require('./routes/blog');
const fs = require('fs');

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Use blog router
app.use('/blog', blog);

// Middleware 1 - Logger
app.use((req, res, next) => {
    console.log(req.headers);
    req.harry = "I am harry bhai";
    
    // Log to file
    fs.appendFileSync('logs.txt', `${Date.now()} is a ${req.method}\n`);
    console.log(`${Date.now()} is a ${req.method}`);
    
    next();
});

// Middleware 2 - Modify request
app.use((req, res, next) => {
    console.log('Middleware 2 executed');
    req.harry = "I am Rohan bhai"; // Overwrites previous value
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('Hello about! ' + req.harry); // Output: Hello about! I am Rohan bhai
});

app.get('/contact', (req, res) => {
    res.send('Hello contact!');
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```

---

### 🔍 **main.js - Line by Line Explanation**

#### **1. Import and Setup**

```javascript
const express = require('express');
```
- **Explanation**: Imports the Express.js framework
- **Purpose**: Gives us access to all Express functionality

```javascript
const app = express();
```
- **Explanation**: Creates an Express application instance
- **Purpose**: `app` object will be used to configure routes, middleware, and start the server

```javascript
const port = 3000;
```
- **Explanation**: Defines the port number where server will listen
- **Purpose**: Server will be accessible at `http://localhost:3000`

```javascript
const blog = require('./routes/blog');
```
- **Explanation**: Imports the blog router from `routes/blog.js` file
- **Purpose**: Modular routing - keeps blog-related routes separate

```javascript
const fs = require('fs');
```
- **Explanation**: Imports Node.js File System module
- **Purpose**: Used to write logs to a file

---

#### **2. Built-in Middleware**

```javascript
app.use(express.json());
```
- **Explanation**: Parses incoming requests with JSON payloads
- **Purpose**: When client sends JSON data (like `{"name": "Harry"}`), this middleware automatically converts it to JavaScript object in `req.body`
- **Example**:
  ```javascript
  // Client sends: {"name": "Harry", "age": 25}
  // In your route: req.body.name → "Harry"
  ```

```javascript
app.use(express.static('public'));
```
- **Explanation**: Serves static files (HTML, CSS, JS, images) from the `public` folder
- **Purpose**: Files in `public/` folder can be accessed directly via URL
- **Example**:
  ```
  public/style.css → accessible at http://localhost:3000/style.css
  public/images/logo.png → accessible at http://localhost:3000/images/logo.png
  ```

---

#### **3. Router-Level Middleware**

```javascript
app.use('/blog', blog);
```
- **Explanation**: Mounts the blog router at the `/blog` path
- **Purpose**: All routes defined in `blog` router will be prefixed with `/blog`
- **How it works**:
  - Route in blog.js: `router.get('/')` → Accessible at `/blog/`
  - Route in blog.js: `router.get('/about')` → Accessible at `/blog/about`

---

#### **4. Custom Middleware 1 - Logger**

```javascript
app.use((req, res, next) => {
    console.log(req.headers);
    req.harry = "I am harry bhai";
    
    fs.appendFileSync('logs.txt', `${Date.now()} is a ${req.method}\n`);
    console.log(`${Date.now()} is a ${req.method}`);
    
    next();
});
```

**Line-by-line breakdown:**

```javascript
app.use((req, res, next) => {
```
- **Explanation**: Defines a middleware that runs on **every request** to any route
- **Parameters**: 
  - `req` = Request object (contains request info)
  - `res` = Response object (used to send response)
  - `next` = Function to pass control to next middleware

```javascript
    console.log(req.headers);
```
- **Explanation**: Prints all HTTP headers to console
- **Example Output**:
  ```javascript
  {
    host: 'localhost:3000',
    'user-agent': 'Mozilla/5.0...',
    accept: 'text/html',
    ...
  }
  ```

```javascript
    req.harry = "I am harry bhai";
```
- **Explanation**: Adds a **custom property** `harry` to the request object
- **Purpose**: This property will be available in all subsequent middleware and routes
- **Important**: You can add any property name (not just `harry`)

```javascript
    fs.appendFileSync('logs.txt', `${Date.now()} is a ${req.method}\n`);
```
- **Explanation**: Writes a log entry to `logs.txt` file
- **Breakdown**:
  - `fs.appendFileSync()` = Adds text to end of file (creates file if doesn't exist)
  - `Date.now()` = Current timestamp in milliseconds (e.g., 1738396800000)
  - `req.method` = HTTP method used (GET, POST, PUT, DELETE, etc.)
  - `\n` = Newline character
- **Example logs.txt**:
  ```
  1738396800000 is a GET
  1738396801234 is a POST
  1738396802567 is a GET
  ```

```javascript
    console.log(`${Date.now()} is a ${req.method}`);
```
- **Explanation**: Prints the same log to console
- **Example Output**: `1738396800000 is a GET`

```javascript
    next();
```
- **Explanation**: Passes control to the **next middleware** in the chain
- **Critical**: Without this, request will hang and timeout!

---

#### **5. Custom Middleware 2 - Request Modifier**

```javascript
app.use((req, res, next) => {
    console.log('Middleware 2 executed');
    req.harry = "I am Rohan bhai"; // Overwrites previous value
    next();
});
```

**Line-by-line breakdown:**

```javascript
    console.log('Middleware 2 executed');
```
- **Explanation**: Logs to console to show this middleware ran
- **Purpose**: Helps debug and understand execution order

```javascript
    req.harry = "I am Rohan bhai";
```
- **Explanation**: **Overwrites** the `req.harry` property set by Middleware 1
- **Important**: The value from the **last middleware** will be available in routes
- **Execution Flow**:
  ```
  Middleware 1: req.harry = "I am harry bhai"
  Middleware 2: req.harry = "I am Rohan bhai" (overwrites)
  Route gets: "I am Rohan bhai"
  ```

---

#### **6. Route Handlers**

```javascript
app.get('/', (req, res) => {
    res.send('Hello World!');
});
```
- **Explanation**: Defines a route for GET requests to `/` (homepage)
- **Purpose**: When user visits `http://localhost:3000/`, they see "Hello World!"
- **Note**: `req.harry` is available here but not used

```javascript
app.get('/about', (req, res) => {
    res.send('Hello about! ' + req.harry);
});
```
- **Explanation**: Route for `/about` page
- **Purpose**: Demonstrates using the custom property added by middleware
- **Output**: `Hello about! I am Rohan bhai`
- **Why "Rohan bhai"?**: Because Middleware 2 (which runs last) set it to that value

```javascript
app.get('/contact', (req, res) => {
    res.send('Hello contact!');
});
```
- **Explanation**: Simple route for contact page
- **Purpose**: Just returns a static message

---

#### **7. Error Handling Middleware**

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

**Line-by-line breakdown:**

```javascript
app.use((err, req, res, next) => {
```
- **Explanation**: Error-handling middleware (identified by **4 parameters**, first being `err`)
- **Purpose**: Catches any errors that occur in routes or middleware
- **Important**: Must be defined **LAST**, after all routes

```javascript
    console.error(err.stack);
```
- **Explanation**: Prints error details to console
- **Purpose**: Helps developers see what went wrong
- **Example Output**:
  ```
  Error: User not found
      at /app/routes/user.js:15:11
      at Layer.handle [as handle_request]...
  ```

```javascript
    res.status(500).send('Something broke!');
```
- **Explanation**: Sends 500 (Internal Server Error) response to client
- **Purpose**: User sees a friendly error message instead of server crashing

---

#### **8. Start Server**

```javascript
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```
- **Explanation**: Starts the server and listens for incoming requests
- **Parameters**:
  - `port` = 3000 (the port number)
  - Callback function = Runs once server starts successfully
- **Output**: `Example app listening on port 3000`
- **Purpose**: Server is now running at `http://localhost:3000`

---

### **File: routes/blog.js** (Full Code)

```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// Define the home page route
router.get('/', (req, res) => {
    res.send('Blog home page');
});

// Define the about route
router.get('/about', (req, res) => {
    res.send('About this blog');
});

module.exports = router;
```

---

### 🔍 **blog.js - Line by Line Explanation**

#### **1. Setup Router**

```javascript
const express = require('express');
```
- **Explanation**: Imports Express framework
- **Purpose**: Needed to create a router

```javascript
const router = express.Router();
```
- **Explanation**: Creates a new router object
- **Purpose**: This router will handle routes separately from the main app
- **Benefit**: Keeps code modular and organized

---

#### **2. Router-Specific Middleware**

```javascript
router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
```

**Line-by-line breakdown:**

```javascript
router.use((req, res, next) => {
```
- **Explanation**: Middleware that runs **only for routes in this router** (blog routes)
- **Scope**: Only executes when `/blog` or `/blog/*` is accessed
- **Does NOT run**: When accessing `/`, `/about`, `/contact` (main app routes)

```javascript
    console.log('Time:', Date.now());
```
- **Explanation**: Logs current timestamp when blog routes are accessed
- **Example Output**: `Time: 1738396800000`
- **Purpose**: Track when blog routes are being used

```javascript
    next();
```
- **Explanation**: Pass control to the next middleware or route in the blog router
- **Flow**: Middleware → Blog route handler

---

#### **3. Blog Routes**

```javascript
router.get('/', (req, res) => {
    res.send('Blog home page');
});
```
- **Explanation**: Defines route for blog homepage
- **URL**: `http://localhost:3000/blog/` (note the `/blog` prefix from main.js)
- **Output**: "Blog home page"
- **Important**: The `/` here is **relative** to `/blog` mount point

```javascript
router.get('/about', (req, res) => {
    res.send('About this blog');
});
```
- **Explanation**: Defines route for blog about page
- **URL**: `http://localhost:3000/blog/about`
- **Output**: "About this blog"

---

#### **4. Export Router**

```javascript
module.exports = router;
```
- **Explanation**: Makes this router available to other files
- **Purpose**: main.js can import and use this router
- **How it's used**: In main.js → `const blog = require('./routes/blog');`

---

## 🔄 Complete Request Flow Example

Let's trace a request to `/blog/about`:

```
1. Client makes request: GET http://localhost:3000/blog/about

2. Express receives request

3. Built-in Middleware:
   ✓ express.json() → Parses JSON (no JSON in this request, so does nothing)
   ✓ express.static('public') → Checks if file exists in public/ (no, so continues)

4. Router Mount Check:
   ✓ app.use('/blog', blog) → Path matches! Execute blog router

5. Blog Router Middleware:
   ✓ Logs: "Time: 1738396800000"
   ✓ Calls next()

6. Custom Middleware 1 (Logger):
   ✓ Logs request headers to console
   ✓ Sets: req.harry = "I am harry bhai"
   ✓ Writes to logs.txt: "1738396800000 is a GET"
   ✓ Calls next()

7. Custom Middleware 2:
   ✓ Logs: "Middleware 2 executed"
   ✓ Overwrites: req.harry = "I am Rohan bhai"
   ✓ Calls next()

8. Blog Route Handler:
   ✓ router.get('/about') executes
   ✓ Sends response: "About this blog"

9. Response sent to client

10. Request complete ✓
```

---

## 🎯 Key Points About the Code

### Why Middleware 2's Value Wins

```javascript
// Middleware 1
req.harry = "I am harry bhai";

// Middleware 2 (runs after Middleware 1)
req.harry = "I am Rohan bhai"; // OVERWRITES

// In route
res.send(req.harry); // Gets: "I am Rohan bhai"
```

### Why Order Matters

```javascript
// ❌ WRONG ORDER
app.get('/about', (req, res) => {
    res.send(req.harry); // undefined! Middleware hasn't run yet
});

app.use((req, res, next) => {
    req.harry = "I am harry bhai";
    next();
});

// ✅ CORRECT ORDER
app.use((req, res, next) => {
    req.harry = "I am harry bhai";
    next();
});

app.get('/about', (req, res) => {
    res.send(req.harry); // "I am harry bhai" ✓
});
```

### Router vs App Routes

```javascript
// Main app route
app.get('/about', ...); // URL: http://localhost:3000/about

// Blog router route
router.get('/about', ...); // URL: http://localhost:3000/blog/about
// (Because router is mounted at '/blog')
```

---

## 🎓 Important Concepts

### Order Matters!

Middlewares are executed in the **order they are defined**:

```javascript
// ❌ WRONG - Route defined before middleware
app.get('/test', (req, res) => {
    res.send(req.customProp); // undefined!
});

app.use((req, res, next) => {
    req.customProp = "Hello";
    next();
});

// ✅ CORRECT - Middleware before route
app.use((req, res, next) => {
    req.customProp = "Hello";
    next();
});

app.get('/test', (req, res) => {
    res.send(req.customProp); // "Hello"
});
```

---

### Multiple Middlewares in Single Route

```javascript
// Authentication middleware
const authenticate = (req, res, next) => {
    if (req.headers.token === 'secret') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Authorization middleware
const authorize = (req, res, next) => {
    if (req.headers.role === 'admin') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// Protected route with multiple middlewares
app.get('/admin', authenticate, authorize, (req, res) => {
    res.send('Welcome Admin!');
});
```

---

### Conditional Middleware

```javascript
app.use((req, res, next) => {
    // Only log POST requests
    if (req.method === 'POST') {
        console.log('POST request made');
    }
    next();
});

// Path-specific middleware
app.use('/api', (req, res, next) => {
    console.log('API route accessed');
    next();
});
```

---

## 🛠️ Common Middleware Patterns

### 1. **Request Validation**

```javascript
const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required'
        });
    }
    
    next();
};

app.post('/user', validateUser, (req, res) => {
    res.json({ success: true, user: req.body });
});
```

---

### 2. **CORS Handler**

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

---

### 3. **Rate Limiting**

```javascript
const rateLimit = {};

app.use((req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!rateLimit[ip]) {
        rateLimit[ip] = { count: 1, resetTime: now + 60000 };
    } else if (now > rateLimit[ip].resetTime) {
        rateLimit[ip] = { count: 1, resetTime: now + 60000 };
    } else {
        rateLimit[ip].count++;
    }
    
    if (rateLimit[ip].count > 100) {
        return res.status(429).send('Too many requests');
    }
    
    next();
});
```

---

## 📊 Middleware Execution Flow

```
Request arrives
    ↓
Middleware 1 (Logger)
    ↓ next()
Middleware 2 (Authentication)
    ↓ next()
Middleware 3 (Custom)
    ↓ next()
Route Handler
    ↓
Send Response
```

---

## ✅ Best Practices

1. **Always call `next()`** if not sending a response
2. **Order matters** - define middlewares before routes
3. **Error handling middleware last** - catches all errors
4. **Keep middleware focused** - one responsibility per middleware
5. **Use router-level middleware** for modular code
6. **Don't modify `res` and `req`** unnecessarily
7. **Handle errors properly** - don't let requests hang

---

## 🚀 Real-World Use Cases

### JWT Authentication

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});
```

---

### Body Parser for File Uploads

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); // File information
    res.send('File uploaded successfully');
});
```

---

## 📚 Summary

| Middleware Type | Use Case | Example |
|----------------|----------|---------|
| **Application-level** | Global operations | Logging, parsing |
| **Router-level** | Modular routes | Blog router, API router |
| **Error-handling** | Catch errors | 404 handler, 500 handler |
| **Built-in** | Common tasks | `express.json()`, `express.static()` |
| **Third-party** | Extended functionality | `morgan`, `cors`, `helmet` |

---

## 🎯 Key Takeaways

- ✅ Middleware intercepts **every request** entering your server
- ✅ Use `next()` to pass control to the next middleware
- ✅ Order of middleware definitions is **critical**
- ✅ Can modify `req` and `res` objects for later use
- ✅ Essential for authentication, logging, validation, and error handling

---

## 📚 Video Reference

**Source**: Middlewares in Express Js | Sigma Web Development Course  
**Instructor**: CodeWithHarry

---

**Next Topics**: Error Handling, Custom Middleware Creation, Third-party Middleware Deep Dive

---

*Last Updated: February 2026*
