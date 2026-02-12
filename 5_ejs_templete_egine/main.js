const express = require("express");
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.get("/", (req, res) => {
     let siteName = "Adidas";
     let searchText = "Search Now";
     let arr = ["Hey", 54, 65];
  res.render("index", { konsabrand : siteName, searchkarna : searchText, arr});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
