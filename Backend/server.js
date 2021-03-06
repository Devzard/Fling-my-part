const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");

//middleware
app.use(cors());
app.use(bodyParser.json()); // app.use(express.json());

//feed routes
//feed posts routes
const dgFeedPost = require("./routes/dgFeedPost");
app.use("/feed", dgFeedPost);

//feed user data route
const dgUser = require("./routes/dgNewUser");
app.use("/feed/user", dgUser);

app.get("/", (req, res) => {
  res.send("Working fine");
});

//connect to Db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log("Listening at port " + port);
});
