const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DgFeedSchema = require("../models/DgFeedSchema");
const DgUserDataSchema = require("../models/DgUserData");

//create user
router.post("/create", async (req, res) => {
  const newUser = new DgUserDataSchema({
    username: req.body.username,
    password: req.body.password,
    location: req.body.location,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting userData
router.get("/", async (req, res) => {
  try {
    const users = await DgUserDataSchema.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting all posts of a user
router.post("/myposts", async (req, res) => {
  //location, userid
  let userPosts = [];
  const userId = req.body._user_id;
  try {
    const postsFromUserLocation = await DgFeedSchema.find({
      location: req.body.location,
    });
    const postsLength = postsFromUserLocation.length;
    if (postsLength > 0) {
      for (let index = 0; index < postsLength; index++) {
        if (
          bcrypt.compareSync(userId, postsFromUserLocation[index].recogniser)
        ) {
          userPosts.push(postsFromUserLocation[index]);
        }
        if (index + 1 >= postsLength) res.status(200).send(userPosts);
      }
    } else res.status(200).send(userPosts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
