const express = require("express");
const router = express.Router();
const DgUserData = require("../models/DgUserData");

router.post("/new", async (req, res) => {
  try {
    const newUser = new DgUserData({
      username: req.body.username,
      name: req.body.name,
      location: req.body.location,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/del", async (req, res) => {
  try {
    const user = await DgUserData.find({ username: req.body.username });
    res.status(200).json({ userId: user[0]._id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
