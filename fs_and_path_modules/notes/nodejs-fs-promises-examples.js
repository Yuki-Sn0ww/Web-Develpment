/**
 * ============================================================================
 * NODEJS FILE SYSTEM WITH PROMISES - MODERN APPROACH (RECOMMENDED)
 * ============================================================================
 * 
 * This file demonstrates the MODERN and RECOMMENDED way to work with files
 * using Promises and async/await syntax.
 * 
 * ✅ ADVANTAGES:
 * - Clean, readable code (no callback hell)
 * - Easy error handling with try-catch
 * - Works like synchronous code but non-blocking
 * - Can use await to wait for operations
 * - Easier to debug and maintain
 * 
 * Author: Your Name
 * Date: January 2026
 * Purpose: Learning modern Node.js file operations
 * ============================================================================
 */

import fs from 'fs/promises'; // Must use import, not require!
import fsSync from 'fs'; // For some operations that don't have promise versions
import path from 'path';

console.log('\n========== PROMISES & ASYNC/AWAIT FILE OPERATIONS ==========\n');

// ============================================================================
// SECTION 1: BASIC ASYNC/AWAIT OPERATIONS
// ============================================================================

/**
 * async/await allows you to write asynchronous code that LOOKS synchronous
 * but is actually non-blocking!
 * 
 * - await pauses execution until Promise resolves
 * - Must be inside an async function
 * - Much cleaner than callbacks
 */

async function basicOperations() {
    console.log('--- SECTION 1: BASIC OPERATIONS WITH ASYNC/AWAIT ---\n');
    
    try {
        // 1.1 - Writing a file
        console.log('1.1 - Writing file with promises...');
        await fs.writeFile('promise-example.txt', 'Hello from promises!');
        console.log('✓ File written successfully');
        
        // 1.2 - Reading a file
        console.log('\n1.2 - Reading file...');
        const data = await fs.readFile('promise-example.txt', 'utf8');
        console.log('✓ File content:', data);
        
        // 1.3 - Appending to file
        console.log('\n1.3 - Appending to file...');
        await fs.appendFile('promise-example.txt', '\nAppended with promises!');
        console.log('✓ Text appended');
        
        // 1.4 - Reading updated content
        console.log('\n1.4 - Reading updated file...');
        const updatedData = await fs.readFile('promise-example.txt', 'utf8');
        console.log('✓ Updated content:');
        console.log(updatedData);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 2: FILE INFORMATION AND CHECKING
// ============================================================================

async function fileInformation() {
    console.log('\n\n--- SECTION 2: FILE INFORMATION ---\n');
    
    try {
        // 2.1 - Check if file exists (using fs.access)
        console.log('2.1 - Checking if file exists...');
        try {
            await fs.access('promise-example.txt');
            console.log('✓ File exists!');
        } catch {
            console.log('❌ File does not exist');
        }
        
        // 2.2 - Get file stats
        console.log('\n2.2 - Getting file statistics...');
        const stats = await fs.stat('promise-example.txt');
        console.log('✓ File stats:', {
            size: stats.size + ' bytes',
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            created: stats.birthtime.toLocaleString(),
            modified: stats.mtime.toLocaleString(),
            accessed: stats.atime.toLocaleString()
        });
        
        // 2.3 - Read file as Buffer (raw binary data)
        console.log('\n2.3 - Reading file as Buffer...');
        const buffer = await fs.readFile('promise-example.txt');
        console.log('✓ Buffer:', buffer);
        console.log('✓ Buffer length:', buffer.length, 'bytes');
        console.log('✓ Converted to string:', buffer.toString());
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 3: FILE MANIPULATION
// ============================================================================

async function fileManipulation() {
    console.log('\n\n--- SECTION 3: FILE MANIPULATION ---\n');
    
    try {
        // 3.1 - Copy file
        console.log('3.1 - Copying file...');
        await fs.copyFile('promise-example.txt', 'copied-file.txt');
        console.log('✓ File copied to: copied-file.txt');
        
        // 3.2 - Rename file
        console.log('\n3.2 - Renaming file...');
        await fs.rename('copied-file.txt', 'renamed-file.txt');
        console.log('✓ File renamed to: renamed-file.txt');
        
        // 3.3 - Delete file
        console.log('\n3.3 - Deleting file...');
        await fs.unlink('renamed-file.txt');
        console.log('✓ File deleted');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 4: DIRECTORY OPERATIONS
// ============================================================================

async function directoryOperations() {
    console.log('\n\n--- SECTION 4: DIRECTORY OPERATIONS ---\n');
    
    try {
        // 4.1 - Create directory
        console.log('4.1 - Creating directory...');
        await fs.mkdir('test-folder', { recursive: true });
        console.log('✓ Directory created: test-folder');
        
        // 4.2 - Create nested directories
        console.log('\n4.2 - Creating nested directories...');
        await fs.mkdir('test-folder/sub-folder/deep-folder', { recursive: true });
        console.log('✓ Nested directories created');
        
        // 4.3 - Write file in directory
        console.log('\n4.3 - Writing file in directory...');
        await fs.writeFile('test-folder/test-file.txt', 'File inside folder!');
        console.log('✓ File created in directory');
        
        // 4.4 - Read directory contents
        console.log('\n4.4 - Reading directory contents...');
        const files = await fs.readdir('test-folder');
        console.log('✓ Files in test-folder:', files);
        
        // 4.5 - Read directory with details
        console.log('\n4.5 - Reading directory with file details...');
        const filesWithDetails = await fs.readdir('test-folder', { withFileTypes: true });
        console.log('✓ Detailed listing:');
        filesWithDetails.forEach(file => {
            console.log(`   ${file.isDirectory() ? '📁' : '📄'} ${file.name}`);
        });
        
        // 4.6 - Remove directory (must be empty)
        console.log('\n4.6 - Cleaning up directories...');
        await fs.unlink('test-folder/test-file.txt'); // Delete file first
        await fs.rmdir('test-folder/sub-folder/deep-folder'); // Remove deepest first
        await fs.rmdir('test-folder/sub-folder');
        await fs.rmdir('test-folder');
        console.log('✓ All directories removed');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 5: MULTIPLE OPERATIONS IN PARALLEL
// ============================================================================

async function parallelOperations() {
    console.log('\n\n--- SECTION 5: PARALLEL OPERATIONS ---\n');
    
    try {
        // 5.1 - Sequential operations (one after another)
        console.log('5.1 - Sequential operations (slow):');
        const start1 = Date.now();
        await fs.writeFile('file1.txt', 'Content 1');
        await fs.writeFile('file2.txt', 'Content 2');
        await fs.writeFile('file3.txt', 'Content 3');
        const time1 = Date.now() - start1;
        console.log(`✓ Created 3 files sequentially in ${time1}ms`);
        
        // 5.2 - Parallel operations (all at once)
        console.log('\n5.2 - Parallel operations (fast):');
        const start2 = Date.now();
        await Promise.all([
            fs.writeFile('file4.txt', 'Content 4'),
            fs.writeFile('file5.txt', 'Content 5'),
            fs.writeFile('file6.txt', 'Content 6')
        ]);
        const time2 = Date.now() - start2;
        console.log(`✓ Created 3 files in parallel in ${time2}ms`);
        console.log(`⚡ Parallel was ${time1 - time2}ms faster!`);
        
        // 5.3 - Read multiple files in parallel
        console.log('\n5.3 - Reading multiple files in parallel...');
        const [content1, content2, content3] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8'),
            fs.readFile('file3.txt', 'utf8')
        ]);
        console.log('✓ Read all files:', { content1, content2, content3 });
        
        // Cleanup
        await Promise.all([
            fs.unlink('file1.txt'),
            fs.unlink('file2.txt'),
            fs.unlink('file3.txt'),
            fs.unlink('file4.txt'),
            fs.unlink('file5.txt'),
            fs.unlink('file6.txt')
        ]);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 6: ADVANCED PATTERNS
// ============================================================================

async function advancedPatterns() {
    console.log('\n\n--- SECTION 6: ADVANCED PATTERNS ---\n');
    
    try {
        // 6.1 - Read JSON file
        console.log('6.1 - Working with JSON files:');
        const jsonData = { name: 'John', age: 30, hobbies: ['coding', 'reading'] };
        await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));
        console.log('✓ JSON file created');
        
        const jsonContent = await fs.readFile('data.json', 'utf8');
        const parsedData = JSON.parse(jsonContent);
        console.log('✓ JSON data read:', parsedData);
        
        // 6.2 - Helper function to safely read/write JSON
        console.log('\n6.2 - Helper functions for JSON:');
        
        async function readJSON(filepath) {
            const content = await fs.readFile(filepath, 'utf8');
            return JSON.parse(content);
        }
        
        async function writeJSON(filepath, data) {
            await fs.writeFile(filepath, JSON.stringify(data, null, 2));
        }
        
        const userData = await readJSON('data.json');
        userData.age = 31; // Update age
        await writeJSON('data.json', userData);
        console.log('✓ JSON updated using helper functions');
        
        // 6.3 - Check file existence safely
        console.log('\n6.3 - Safe file existence check:');
        
        async function fileExists(filepath) {
            try {
                await fs.access(filepath);
                return true;
            } catch {
                return false;
            }
        }
        
        const exists1 = await fileExists('data.json');
        const exists2 = await fileExists('nonexistent.txt');
        console.log('✓ data.json exists:', exists1);
        console.log('✓ nonexistent.txt exists:', exists2);
        
        // 6.4 - Read file with fallback
        console.log('\n6.4 - Read file with default fallback:');
        
        async function readFileWithDefault(filepath, defaultContent = '') {
            try {
                return await fs.readFile(filepath, 'utf8');
            } catch {
                return defaultContent;
            }
        }
        
        const existingFile = await readFileWithDefault('data.json', '{}');
        const missingFile = await readFileWithDefault('missing.txt', 'Default content');
        console.log('✓ Existing file length:', existingFile.length);
        console.log('✓ Missing file fallback:', missingFile);
        
        // 6.5 - Ensure directory exists
        console.log('\n6.5 - Ensure directory exists:');
        
        async function ensureDir(dirpath) {
            try {
                await fs.mkdir(dirpath, { recursive: true });
            } catch (error) {
                if (error.code !== 'EEXIST') throw error;
            }
        }
        
        await ensureDir('output/logs');
        console.log('✓ Directory ensured: output/logs');
        await fs.rmdir('output/logs');
        await fs.rmdir('output');
        
        // Cleanup
        await fs.unlink('data.json');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 7: ERROR HANDLING PATTERNS
// ============================================================================

async function errorHandling() {
    console.log('\n\n--- SECTION 7: ERROR HANDLING ---\n');
    
    // 7.1 - Basic try-catch
    console.log('7.1 - Basic error handling:');
    try {
        await fs.readFile('nonexistent-file.txt', 'utf8');
    } catch (error) {
        console.log('✓ Caught error:', error.code, '-', error.message);
    }
    
    // 7.2 - Specific error handling
    console.log('\n7.2 - Handling specific errors:');
    try {
        await fs.readFile('another-missing-file.txt', 'utf8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('✓ File not found - creating it now...');
            await fs.writeFile('another-missing-file.txt', 'New file created!');
            console.log('✓ File created successfully');
        } else {
            console.error('❌ Unexpected error:', error.message);
        }
    }
    
    // 7.3 - Multiple operations with rollback
    console.log('\n7.3 - Transaction-like operations with rollback:');
    const createdFiles = [];
    try {
        await fs.writeFile('temp1.txt', 'content');
        createdFiles.push('temp1.txt');
        
        await fs.writeFile('temp2.txt', 'content');
        createdFiles.push('temp2.txt');
        
        // Simulate an error
        throw new Error('Simulated error!');
        
        await fs.writeFile('temp3.txt', 'content');
        createdFiles.push('temp3.txt');
        
    } catch (error) {
        console.log('✓ Error occurred:', error.message);
        console.log('✓ Rolling back - deleting created files...');
        for (const file of createdFiles) {
            try {
                await fs.unlink(file);
                console.log(`  ✓ Deleted: ${file}`);
            } catch {
                console.log(`  ⚠️ Could not delete: ${file}`);
            }
        }
    }
    
    // Cleanup
    try {
        await fs.unlink('another-missing-file.txt');
    } catch {
        // Ignore
    }
}

// ============================================================================
// SECTION 8: PATH MODULE WITH PROMISES
// ============================================================================

async function pathWithPromises() {
    console.log('\n\n--- SECTION 8: PATH MODULE + PROMISES ---\n');
    
    try {
        // 8.1 - Building safe file paths
        console.log('8.1 - Building safe file paths:');
        const userDir = 'users';
        const userId = 'user123';
        const fileName = 'profile.json';
        
        // WRONG WAY (prone to errors):
        const unsafePath = userDir + '/' + userId + '/' + fileName;
        console.log('❌ Unsafe path (string concat):', unsafePath);
        
        // RIGHT WAY:
        const safePath = path.join(userDir, userId, fileName);
        console.log('✓ Safe path (path.join):', safePath);
        
        // 8.2 - Creating files with safe paths
        console.log('\n8.2 - Creating files with path.join:');
        await fs.mkdir(path.join('users', 'user123'), { recursive: true });
        await fs.writeFile(safePath, JSON.stringify({ name: 'John', id: 'user123' }));
        console.log('✓ File created at:', safePath);
        
        // 8.3 - Getting file info from path
        console.log('\n8.3 - Extracting path information:');
        const fullPath = path.resolve(safePath);
        console.log('Full path:', fullPath);
        console.log('Directory:', path.dirname(fullPath));
        console.log('Filename:', path.basename(fullPath));
        console.log('Extension:', path.extname(fullPath));
        
        // 8.4 - Working with __dirname equivalent in ES modules
        console.log('\n8.4 - Getting current directory info:');
        import { fileURLToPath } from 'url';
        import { dirname } from 'path';
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        
        console.log('Current file:', __filename);
        console.log('Current directory:', __dirname);
        
        // 8.5 - List all files recursively
        console.log('\n8.5 - Listing files recursively:');
        
        async function listFilesRecursive(dirPath, indent = '') {
            const items = await fs.readdir(dirPath, { withFileTypes: true });
            for (const item of items) {
                const itemPath = path.join(dirPath, item.name);
                if (item.isDirectory()) {
                    console.log(`${indent}📁 ${item.name}/`);
                    if (indent.length < 6) { // Limit depth
                        await listFilesRecursive(itemPath, indent + '  ');
                    }
                } else {
                    console.log(`${indent}📄 ${item.name}`);
                }
            }
        }
        
        console.log('Files in "users" directory:');
        await listFilesRecursive('users');
        
        // Cleanup
        await fs.unlink(safePath);
        await fs.rmdir(path.join('users', 'user123'));
        await fs.rmdir('users');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 9: REAL-WORLD EXAMPLES
// ============================================================================

async function realWorldExamples() {
    console.log('\n\n--- SECTION 9: REAL-WORLD EXAMPLES ---\n');
    
    try {
        // 9.1 - Logger utility
        console.log('9.1 - Simple file logger:');
        
        class FileLogger {
            constructor(logFile) {
                this.logFile = logFile;
            }
            
            async log(message) {
                const timestamp = new Date().toISOString();
                const logEntry = `[${timestamp}] ${message}\n`;
                await fs.appendFile(this.logFile, logEntry);
            }
            
            async getLogs() {
                try {
                    return await fs.readFile(this.logFile, 'utf8');
                } catch {
                    return '';
                }
            }
            
            async clear() {
                await fs.writeFile(this.logFile, '');
            }
        }
        
        const logger = new FileLogger('app.log');
        await logger.log('Application started');
        await logger.log('User logged in');
        await logger.log('Data saved successfully');
        
        const logs = await logger.getLogs();
        console.log('✓ Log entries:');
        console.log(logs);
        
        await fs.unlink('app.log');
        
        // 9.2 - Configuration manager
        console.log('9.2 - Configuration manager:');
        
        class ConfigManager {
            constructor(configFile) {
                this.configFile = configFile;
            }
            
            async load() {
                try {
                    const content = await fs.readFile(this.configFile, 'utf8');
                    return JSON.parse(content);
                } catch {
                    return {}; // Return empty config if file doesn't exist
                }
            }
            
            async save(config) {
                await fs.writeFile(this.configFile, JSON.stringify(config, null, 2));
            }
            
            async get(key, defaultValue) {
                const config = await this.load();
                return config[key] ?? defaultValue;
            }
            
            async set(key, value) {
                const config = await this.load();
                config[key] = value;
                await this.save(config);
            }
        }
        
        const config = new ConfigManager('config.json');
        await config.set('appName', 'MyApp');
        await config.set('version', '1.0.0');
        await config.set('debug', true);
        
        const appName = await config.get('appName');
        const theme = await config.get('theme', 'dark'); // with default
        
        console.log('✓ Config - appName:', appName);
        console.log('✓ Config - theme (default):', theme);
        
        await fs.unlink('config.json');
        
        // 9.3 - File backup utility
        console.log('\n9.3 - File backup utility:');
        
        async function backupFile(filePath) {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const parsedPath = path.parse(filePath);
            const backupPath = path.join(
                parsedPath.dir,
                `${parsedPath.name}.backup.${timestamp}${parsedPath.ext}`
            );
            
            await fs.copyFile(filePath, backupPath);
            return backupPath;
        }
        
        await fs.writeFile('important.txt', 'Critical data');
        const backupPath = await backupFile('important.txt');
        console.log('✓ Backup created:', path.basename(backupPath));
        
        // Cleanup
        await fs.unlink('important.txt');
        await fs.unlink(backupPath);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

// ============================================================================
// SECTION 10: PROMISES VS CALLBACKS VS SYNC - COMPARISON
// ============================================================================

async function comparison() {
    console.log('\n\n--- SECTION 10: COMPARISON OF ALL METHODS ---\n');
    
    console.log('METHOD 1 - Synchronous (Blocking):');
    console.log('```javascript');
    console.log('const data = fs.readFileSync("file.txt", "utf8");');
    console.log('console.log(data);');
    console.log('```');
    console.log('❌ Blocks execution');
    console.log('❌ Freezes entire app');
    console.log('✓ Simple to write');
    
    console.log('\nMETHOD 2 - Callbacks (Non-blocking):');
    console.log('```javascript');
    console.log('fs.readFile("file.txt", "utf8", (error, data) => {');
    console.log('    if (error) { console.error(error); return; }');
    console.log('    console.log(data);');
    console.log('});');
    console.log('```');
    console.log('✓ Non-blocking');
    console.log('❌ Callback hell with nested operations');
    console.log('❌ Harder to read');
    
    console.log('\nMETHOD 3 - Promises/Async-Await (RECOMMENDED):');
    console.log('```javascript');
    console.log('try {');
    console.log('    const data = await fs.readFile("file.txt", "utf8");');
    console.log('    console.log(data);');
    console.log('} catch (error) {');
    console.log('    console.error(error);');
    console.log('}');
    console.log('```');
    console.log('✅ Non-blocking');
    console.log('✅ Clean, readable code');
    console.log('✅ Easy error handling');
    console.log('✅ Best for production');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    try {
        await basicOperations();
        await fileInformation();
        await fileManipulation();
        await directoryOperations();
        await parallelOperations();
        await advancedPatterns();
        await errorHandling();
        await pathWithPromises();
        await realWorldExamples();
        await comparison();
        
        // Final cleanup
        try {
            await fs.unlink('promise-example.txt');
        } catch {
            // Ignore cleanup errors
        }
        
        console.log('\n\n========== ALL PROMISE EXAMPLES COMPLETED ==========\n');
        console.log('✅ KEY TAKEAWAYS:');
        console.log('   1. Use fs/promises (import, not require)');
        console.log('   2. Use async/await for clean code');
        console.log('   3. Always use try-catch for error handling');
        console.log('   4. Use Promise.all() for parallel operations');
        console.log('   5. Use path.join() for cross-platform paths');
        console.log('   6. Validate user input before file operations');
        console.log('   7. This is the RECOMMENDED way for production code!\n');
        
    } catch (error) {
        console.error('❌ Fatal error:', error);
    }
}

// Run all examples
main();
