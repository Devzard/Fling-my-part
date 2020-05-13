const mongoose = require("mongoose");

const DgFeed = mongoose.Schema({
  title: {
    type: {
      tag: String,
      text: String,
      className: String,
    },
  },
  category: {
    type: String,
    default: "General",
  },
  content: {
    type: [
      {
        tags: String,
        text: String,
        className: String,
        template: String,
      },
    ],
    required: true,
  },
  image: {
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
  recogniser: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
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
