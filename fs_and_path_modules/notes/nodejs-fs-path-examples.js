/**
 * ============================================================================
 * NODEJS FILE SYSTEM (fs) AND PATH MODULE - COMPLETE GUIDE
 * ============================================================================
 * 
 * This file contains detailed examples of:
 * 1. Synchronous File Operations
 * 2. Asynchronous File Operations (Callbacks)
 * 3. Promise-based File Operations (Modern/Recommended)
 * 4. Path Module Operations
 * 
 * Author: Your Name
 * Date: January 2026
 * Purpose: Learning Node.js backend development
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

console.log('\n========== NODE.JS FILE SYSTEM & PATH MODULE EXAMPLES ==========\n');

// ============================================================================
// SECTION 1: SYNCHRONOUS FILE OPERATIONS (Blocking)
// ============================================================================
console.log('--- SECTION 1: SYNCHRONOUS OPERATIONS ---\n');

/**
 * SYNCHRONOUS operations BLOCK the entire program until they complete.
 * The code execution WAITS at each line.
 * 
 * ⚠️ NOT RECOMMENDED for production servers because:
 * - Blocks the event loop
 * - Prevents handling other requests
 * - Makes your app slow and unresponsive
 * 
 * ✅ GOOD FOR: Simple scripts, one-time operations, build tools
 */

try {
    console.log('1.1 - writeFileSync: Writing file synchronously...');
    fs.writeFileSync('sync-example.txt', 'This is synchronous file writing!');
    console.log('✓ File written successfully');
    
    console.log('\n1.2 - readFileSync: Reading file synchronously...');
    const syncData = fs.readFileSync('sync-example.txt', 'utf8'); // 'utf8' directly converts Buffer to string
    console.log('✓ File content:', syncData);
    
    console.log('\n1.3 - appendFileSync: Appending to file...');
    fs.appendFileSync('sync-example.txt', '\nAppended text!');
    console.log('✓ Text appended');
    
    console.log('\n1.4 - Reading updated file...');
    const updatedData = fs.readFileSync('sync-example.txt', 'utf8');
    console.log('✓ Updated content:', updatedData);
    
} catch (error) {
    console.error('❌ Error in synchronous operations:', error.message);
}

// ============================================================================
// SECTION 2: ASYNCHRONOUS FILE OPERATIONS WITH CALLBACKS (Non-blocking)
// ============================================================================
console.log('\n\n--- SECTION 2: ASYNCHRONOUS OPERATIONS (CALLBACKS) ---\n');

/**
 * ASYNCHRONOUS operations DON'T BLOCK the program.
 * Code continues executing while file operations happen in the background.
 * 
 * ✅ BETTER than sync because:
 * - Doesn't block the event loop
 * - Can handle multiple operations simultaneously
 * - Server remains responsive
 * 
 * ⚠️ DRAWBACK: Can lead to "callback hell" with nested operations
 * 
 * Callback function signature: (error, data) => {}
 * - error: null if successful, error object if failed
 * - data: the result (if any)
 */

console.log('2.1 - writeFile: Writing file asynchronously...');
console.log('     (Notice this prints BEFORE "File written" callback)');

fs.writeFile('async-callback.txt', 'Hello from async callback!', (error) => {
    if (error) {
        console.error('❌ Error writing file:', error.message);
        return;
    }
    console.log('✓ File written successfully (callback executed)');
    
    // Reading the file we just wrote (nested callback)
    console.log('\n2.2 - readFile: Reading file asynchronously...');
    fs.readFile('async-callback.txt', (error, data) => {
        if (error) {
            console.error('❌ Error reading file:', error.message);
            return;
        }
        
        // data is a Buffer object (raw binary data)
        console.log('✓ Raw data (Buffer):', data);
        console.log('✓ Converted to string:', data.toString());
        
        // Appending to the file (more nesting - "callback hell")
        console.log('\n2.3 - appendFile: Appending to file...');
        fs.appendFile('async-callback.txt', '\nAppended via callback!', (error) => {
            if (error) {
                console.error('❌ Error appending:', error.message);
                return;
            }
            console.log('✓ Text appended successfully');
            
            // Reading again to verify
            fs.readFile('async-callback.txt', 'utf8', (error, finalData) => {
                if (error) {
                    console.error('❌ Error reading final data:', error.message);
                    return;
                }
                console.log('✓ Final content:', finalData);
            });
        });
    });
});

console.log('     This line prints IMMEDIATELY (non-blocking!)\n');

// ============================================================================
// SECTION 3: OTHER USEFUL CALLBACK-BASED OPERATIONS
// ============================================================================

setTimeout(() => {
    console.log('\n--- SECTION 3: OTHER CALLBACK OPERATIONS ---\n');
    
    // 3.1 - Check if file exists
    console.log('3.1 - fs.access: Checking if file exists...');
    fs.access('async-callback.txt', fs.constants.F_OK, (error) => {
        if (error) {
            console.log('❌ File does not exist');
        } else {
            console.log('✓ File exists!');
        }
    });
    
    // 3.2 - Get file information
    console.log('\n3.2 - fs.stat: Getting file information...');
    fs.stat('async-callback.txt', (error, stats) => {
        if (error) {
            console.error('❌ Error getting stats:', error.message);
            return;
        }
        console.log('✓ File stats:', {
            size: stats.size + ' bytes',
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            created: stats.birthtime,
            modified: stats.mtime
        });
    });
    
    // 3.3 - Rename file
    console.log('\n3.3 - fs.rename: Renaming file...');
    fs.rename('async-callback.txt', 'renamed-callback.txt', (error) => {
        if (error) {
            console.error('❌ Error renaming:', error.message);
            return;
        }
        console.log('✓ File renamed successfully');
    });
    
    // 3.4 - Delete file
    setTimeout(() => {
        console.log('\n3.4 - fs.unlink: Deleting file...');
        fs.unlink('renamed-callback.txt', (error) => {
            if (error) {
                console.error('❌ Error deleting:', error.message);
                return;
            }
            console.log('✓ File deleted successfully');
        });
    }, 500);
    
}, 1000); // Wait for previous operations to complete

// ============================================================================
// SECTION 4: WORKING WITH DIRECTORIES
// ============================================================================

setTimeout(() => {
    console.log('\n\n--- SECTION 4: DIRECTORY OPERATIONS ---\n');
    
    // 4.1 - Create directory
    console.log('4.1 - fs.mkdir: Creating directory...');
    fs.mkdir('test-directory', { recursive: true }, (error) => {
        if (error) {
            console.error('❌ Error creating directory:', error.message);
            return;
        }
        console.log('✓ Directory created');
        
        // 4.2 - Read directory contents
        console.log('\n4.2 - fs.readdir: Reading current directory...');
        fs.readdir('.', (error, files) => {
            if (error) {
                console.error('❌ Error reading directory:', error.message);
                return;
            }
            console.log('✓ Files in current directory:', files);
            
            // 4.3 - Remove directory
            console.log('\n4.3 - fs.rmdir: Removing directory...');
            fs.rmdir('test-directory', (error) => {
                if (error) {
                    console.error('❌ Error removing directory:', error.message);
                    return;
                }
                console.log('✓ Directory removed');
            });
        });
    });
}, 2000);

// ============================================================================
// SECTION 5: PATH MODULE - WORKING WITH FILE PATHS
// ============================================================================

setTimeout(() => {
    console.log('\n\n--- SECTION 5: PATH MODULE ---\n');
    
    /**
     * The PATH module helps you work with file paths in a cross-platform way.
     * Windows uses backslashes (\), Linux/Mac use forward slashes (/)
     * Path module handles these differences automatically!
     */
    
    // Example paths (Windows-style)
    const windowsPath = 'C:\\Users\\student\\Documents\\project\\index.js';
    const mixedPath = 'C:/Users/student\\Documents/project\\index.js';
    
    console.log('5.1 - path.basename: Get filename from path');
    console.log('     Input:', windowsPath);
    console.log('     Output:', path.basename(windowsPath));
    console.log('     Without extension:', path.basename(windowsPath, '.js'));
    
    console.log('\n5.2 - path.dirname: Get directory path');
    console.log('     Input:', windowsPath);
    console.log('     Output:', path.dirname(windowsPath));
    
    console.log('\n5.3 - path.extname: Get file extension');
    console.log('     Input:', windowsPath);
    console.log('     Output:', path.extname(windowsPath));
    
    console.log('\n5.4 - path.parse: Parse path into object');
    console.log('     Input:', windowsPath);
    console.log('     Output:', path.parse(windowsPath));
    
    console.log('\n5.5 - path.join: Join path segments correctly');
    console.log('     Input: "folder", "subfolder", "file.txt"');
    console.log('     Output:', path.join('folder', 'subfolder', 'file.txt'));
    console.log('     Mixed slashes:', path.join('C:/', 'Users\\student', 'Documents/file.txt'));
    
    console.log('\n5.6 - path.resolve: Get absolute path');
    console.log('     Input: "folder", "file.txt"');
    console.log('     Output:', path.resolve('folder', 'file.txt'));
    
    console.log('\n5.7 - path.normalize: Clean up path');
    console.log('     Input: "C:/Users//student/./Documents/../file.txt"');
    console.log('     Output:', path.normalize('C:/Users//student/./Documents/../file.txt'));
    
    console.log('\n5.8 - path.isAbsolute: Check if path is absolute');
    console.log('     "C:/Users/student":', path.isAbsolute('C:/Users/student'));
    console.log('     "folder/file.txt":', path.isAbsolute('folder/file.txt'));
    
    console.log('\n5.9 - path.relative: Get relative path between two paths');
    console.log('     From: "C:/Users/student/Documents"');
    console.log('     To: "C:/Users/student/Pictures"');
    console.log('     Output:', path.relative('C:/Users/student/Documents', 'C:/Users/student/Pictures'));
    
    console.log('\n5.10 - Special path properties');
    console.log('     Path separator:', path.sep); // \ on Windows, / on Linux
    console.log('     Path delimiter:', path.delimiter); // ; on Windows, : on Linux
    
    // Practical example: Building a file path safely
    console.log('\n5.11 - PRACTICAL EXAMPLE: Building safe paths');
    const userFolder = 'users';
    const username = 'john_doe';
    const fileName = 'profile.json';
    
    const safePath = path.join(__dirname, userFolder, username, fileName);
    console.log('     Safe path created:', safePath);
    console.log('     __dirname is:', __dirname); // Current directory
    console.log('     __filename is:', __filename); // Current file path
    
}, 3000);

// ============================================================================
// SECTION 6: COMMON PATTERNS AND BEST PRACTICES
// ============================================================================

setTimeout(() => {
    console.log('\n\n--- SECTION 6: BEST PRACTICES ---\n');
    
    console.log('✅ BEST PRACTICES FOR FILE OPERATIONS:');
    console.log('   1. Always handle errors (check error parameter in callbacks)');
    console.log('   2. Use async operations for servers (writeFile, not writeFileSync)');
    console.log('   3. Use promises/async-await for cleaner code (see promises example file)');
    console.log('   4. Close file descriptors when using fs.open/fs.close');
    console.log('   5. Use path.join() instead of string concatenation for paths');
    console.log('   6. Specify encoding ("utf8") when reading text files');
    console.log('   7. Use try-catch for sync operations, error callbacks for async');
    console.log('   8. Never trust user input - validate file paths!');
    
    console.log('\n⚠️ COMMON MISTAKES TO AVOID:');
    console.log('   ❌ Using sync methods in production servers');
    console.log('   ❌ Not handling errors properly');
    console.log('   ❌ Forgetting to convert Buffer to string with .toString()');
    console.log('   ❌ Building paths with string concatenation (use path.join!)');
    console.log('   ❌ Assuming file operations always succeed');
    console.log('   ❌ Not checking if file exists before reading');
    
    console.log('\n📚 WHEN TO USE EACH METHOD:');
    console.log('   • Synchronous (Sync): Simple scripts, build tools, initialization');
    console.log('   • Callbacks: Legacy code, when you need fine control');
    console.log('   • Promises: RECOMMENDED - Clean, modern, easy error handling');
    
    console.log('\n\n========== END OF CALLBACK EXAMPLES ==========');
    console.log('\nSee the promises example file for the modern approach!\n');
    
}, 4000);

// ============================================================================
// CLEANUP
// ============================================================================
setTimeout(() => {
    // Clean up example files
    try {
        if (fs.existsSync('sync-example.txt')) {
            fs.unlinkSync('sync-example.txt');
        }
    } catch (error) {
        // Ignore cleanup errors
    }
}, 5000);
