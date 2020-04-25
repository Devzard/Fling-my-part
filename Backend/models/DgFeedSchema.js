const mongoose = require("mongoose");

const DgFeed = mongoose.Schema({
  title: {
    type: String,
    default: "No title",
  },
  category: {
    type: String,
    default: "General",
  },
  template: {
    type: Number,
    default: 1,
  },
  content: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },
  location: {
    type: String,
    default: "Global",
  },
  likedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  reportedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: [{ name: String, comment: String }],
    default: [],
  },
});

module.exports = mongoose.model("DgFeed", DgFeed);
