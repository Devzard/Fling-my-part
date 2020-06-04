const mongoose = require("mongoose");

const DgFeed = mongoose.Schema({
  title: {
    type: String,
    default: "No Title",
  },
  blocks: [mongoose.Schema.Types.Mixed],
  location: {
    type: String,
    default: "Global",
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
  lastModified: {
    type: Date,
    default: Date.now,
  },
  response: {
    type: [{ name: String, comment: String }],
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("DgFeed", DgFeed);
