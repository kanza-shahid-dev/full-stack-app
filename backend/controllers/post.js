const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching post failed",
      });
    });
};

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: req.file ? url + "/images/" + req.file.filename : "",
    creator: req.userData.userId, //get user id from check-auth middleware
  });

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdPost._id,
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post creation failed",
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.n > 0) res.status(200).json({ message: "Post deleted!" });
      else res.status(401).json({ message: "Not authorized" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Post deletion failed",
      });
    });
};
