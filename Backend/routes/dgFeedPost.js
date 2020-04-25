const express = require("express");
const router = express.Router();
const DgFeedSchema = require("../models/DgFeedSchema");

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

  const newPost = new DgFeedSchema({
    title: req.body.title,
    category: req.body.category,
    template: req.body.template,
    content: req.body.content,
    link: req.body.link,
    location: req.body.location,
    userId: req.body.userId,
    username: req.body.username,
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
  const skip = parseInt(10 * (req.body.pageNumber - 1));
  const location = req.params.location;
  let posts;

  try {
    if (location == "Global") {
      posts = await DgFeedSchema.find().skip(skip).limit(10);
    } else {
      posts = await DgFeedSchema.find({ location: location })
        .skip(skip)
        .limit(10);
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//getting posts with post id
router.post("/posts/:id", async (req, res) => {
  const userId = req.body._user_id;
  try {
    const completepost = await DgFeedSchema.find({ _id: req.params.id });
    res.status(200).json(completepost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//deleting post
//delete a single post
router.delete("/delete", async (req, res) => {
  const postId = req.body._id;
  try {
    if (req.body._user_id == req.body.userId) {
      const removedPost = await DgFeedSchema.remove({ _id: postId });
      res.status(200).json(removedPost);
    } else {
      res.status(200).send("you are not the owner of this post");
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//updating single post
router.patch("/update", async (req, res) => {
  try {
    if (req.body._user_id == req.body.userId) {
      const updatePost = await DgFeedSchema.updateOne(
        { _id: req.body._id },
        {
          $set: {
            // category: req.body.category,
            // content: req.body.content,
            likedUsers: req.body.likedUsers,
            reportedUsers: req.body.reportedUsers,
            comments: req.body.comments,
          },
        }
      );
      res.status(200).send(updatePost);
    } else {
      res.status(200).send("you are not the owner of this post");
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
