const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DgFeedSchema = require("../models/DgFeedSchema");

//function to hash values
const hasher = async (beforehash) => {
  const hashed = await bcrypt.hash(beforehash, 10);
  return hashed;
};

///function to check if the posts at certain location has reached its limit and delete accordingly
const spaceManager = async (locationOfPost) => {
  const delPosts = await DgFeedSchema.find({ location: locationOfPost });

  if (delPosts.length > 1000) {
    const removedPost = await DgFeedSchema.remove({ _id: delPosts[0]._id });
    console.log(removedPost);
  }
};

//adding posts
router.post("/new", async (req, res) => {
  spaceManager(req.body.location);

  const recogniser = await hasher(req.body.userId);

  const newPost = new DgFeedSchema({
    title: req.body.title,
    blocks: req.body.blocks,
    location: req.body.location,
    recogniser: recogniser,
    username: req.body.username,
    name: req.body.name,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting posts
router.post("/:location", async (req, res) => {
  //prom : location
  //pagenumber : each page contain 10 posts
  const skip = parseInt(10 * (req.body.pageNumber - 1));
  const location = req.params.location;
  let posts;

  try {
    if (location == "Global") {
      posts = await DgFeedSchema.find()
        .skip(skip)
        .limit(10)
        .select({ reportedUsers: 0, response: 0, lastModified: 0 });
    } else {
      posts = await DgFeedSchema.find({ location: location })
        .skip(skip)
        .limit(10)
        .select({ reportedUsers: 0, response: 0, lastModified: 0 });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting posts with post id
router.post("/posts/:id", async (req, res) => {
  //userId is seeked for no reason right at the moment
  //post mongodb _id
  const userId = req.body._user_id;
  const postId = req.params.id;
  try {
    const completepost = await DgFeedSchema.find({ _id: postId }).select({
      reportedUsers: 0,
    });
    res.status(200).json(completepost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting posts of a particular user
router.post("/user/posts/:username", async (req, res) => {
  const userId = req.body._user_id;
  //username is asked
  try {
    const completepost = await DgFeedSchema.find({
      username: req.params.username,
    }).select({ reportedUsers: 0, response: 0, lastModified: 0 });
    res.status(200).json(completepost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//deleting post
//delete a single post
router.delete("/delete", async (req, res) => {
  //post mongodb _id
  //_user_id to authenticate
  const postId = req.body._id;
  try {
    await bcrypt.compare(
      req.body._user_id,
      req.body.recogniser,
      async function (err, result) {
        if (isHashMatching(req.body._user_id, req.body.recogniser)) {
          const removedPost = await DgFeedSchema.remove({ _id: postId });
          res.status(200).json(removedPost);
        } else if (!result) {
          res
            .status(200)
            .json({ message: "you are not the owner of this post" });
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

//edit a single post
router.patch("/edit_post", async (req, res) => {
  //will receive user id and post id and recogniser
  //new updated post data

  let currentDate = new Date().toISOString();
  try {
    await bcrypt.compare(
      req.body._user_id,
      req.body.recogniser,
      async function (err, result) {
        if (result) {
          const updatePost = await DgFeedSchema.updateOne(
            { _id: req.body._id },
            {
              $set: {
                title: req.body.title,
                blocks: req.body.blocks,
                location: req.body.location,
                lastModified: currentDate,
              },
            }
          );
          res.status(200).send(updatePost);
        } else if (!result) {
          res
            .status(200)
            .json({ message: "you are not the owner of this post" });
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

//updating single post
router.patch("/update", async (req, res) => {
  //_user_id
  //changed data : likedUsers, reportedUsers, comments
  const post = await DgFeedSchema.find({
    _id: req.body._id,
  });
  if (post.response == null) post.response = [];
  if (post.reportedUsers == null) post.reportedUsers = [];

  let newReportedUsers, newResponses;

  try {
    await bcrypt.compare(
      req.body._user_id,
      req.body.recogniser,
      async function (err, result) {
        if (result) {
          if (req.body.type == "report") {
            newReportedUsers = post.reportedUsers.push(req.body._user_id);
            newResponses = post.response;
          } else if (req.body.type == "update_response") {
            newReportedUsers = post.reportedUsers;
            newResponses = post.response.push(req.body.response);
          } else {
            newReportedUsers = post.reportedUsers;
            newResponses = post.response;
          }
          const updatePost = await DgFeedSchema.updateOne(
            { _id: req.body._id },
            {
              $set: {
                reportedUsers: newReportedUsers,
                response: newResponses,
              },
            }
          );
          res.status(200).send(updatePost);
        } else if (!result) {
          res
            .status(400)
            .json({ message: "you are not the owner of this post" });
        } else {
          res.status(500).json({ message: err });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
