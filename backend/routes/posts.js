const express = require("express");
const multer = require("multer");
const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]; //if according to specified mime type
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    //cb is callback function
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log("re", req.file);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: req.file ? url + "/images/" + req.file.filename : "",
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: "Post added successfully",
        postId: createdPost._id,
        post: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    });
  }
);

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
