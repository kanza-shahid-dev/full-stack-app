const express = require("express");

const checkAuth = require("../middleware/check-auth");
const { getPosts, createPost, deletePost } = require("../controllers/post");
const extractFiles = require("../middleware/file");

const router = express.Router();

router.get("", getPosts);

router.post(
  "",
  checkAuth,
  extractFiles, //middleware
  createPost
);

router.delete("/:id", checkAuth, deletePost);

module.exports = router;
