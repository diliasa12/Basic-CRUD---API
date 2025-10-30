const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/router.js");
const port = 5500;
mongoose
  .connect("mongodb://localhost:27017/nexcent")
  .then(() => {
    console.log("Connected!");
  })
  .catch(() => {
    console.log("Failed");
  });
// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Router
app.use("/accounts", router);
app.listen(port, () => {
  console.log(`Server sudah berjalan di port ${port}`);
});
