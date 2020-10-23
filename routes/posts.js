const express = require("express");
const router = express.Router();
const controllers = require("../controllers/postControllers");

const {
  getAllPosts,
  createNewPost,
  getPostsById,
  updatePost,
  deletePost,
} = controllers;

router.route("/").get(getAllPosts).post(createNewPost);

router.route("/:id").get(getPostsById).patch(updatePost).delete(deletePost);

module.exports = router;
