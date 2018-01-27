const ejs = require("ejs");
const express = require('express');
const fs = require('fs-extra');

const app = express();

console.log(__dirname);
app.get("/", function (req, res) {
  str = fs.readFileSync(__dirname + "/index.ejs", "utf8");
  res.send(
    ejs.render(str, {
      names: [
        "cd",
        "lw"
      ],
      filename: __dirname
    })
  )
});
app.listen(3000, function () {
  console.log("server is running")
});