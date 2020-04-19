const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//middleware
app.use(cors());

//posts routes
// const postRoute = require("./routes/postRoute");
// app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Working fine");
});

//connecting to database
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log("Listening at port " + port);
});
