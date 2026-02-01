const fs = require("fs");
const path = require('path')

try {
  // Read contents of the current directory
  const fullPath = path.join(__dirname, 'files');
  const files = fs.readdirSync(fullPath);
  files.forEach((file, index) => {
    let extName = path.extname(file).slice(1);
    if (fs.existsSync(path.join(fullPath, extName))) {
      console.log("folder exists");
      try {
        fs.renameSync(path.join(fullPath, file), path.join(path.join(fullPath, extName), file));
        console.log("File moved successfully!");
      } catch (err) {
        console.error(err);
      }
    } else {
      fs.mkdirSync(path.join(fullPath, extName), { recursive: true });
      try {
        fs.renameSync(path.join(fullPath, file), path.join(path.join(fullPath, extName), file));
        console.log("File moved successfully!");
      } catch (err) {
        console.error(err);
      }
    }
  })
  
} catch (err) {
  console.error("Error reading directory:", err);
}
