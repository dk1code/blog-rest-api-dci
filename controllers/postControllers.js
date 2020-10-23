const Post = require("../models/Post");
const User = require("../models/User");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    const post = Post.findById(id);
    await user;
    await post;

    if (user) {
      const posts = await Post.find({ userId: id });
      res.status(200).json({
        requestedPosts: {
          count: posts.length,
          posts: posts,
        },
      });
    } else if (post) {
      res.status(200).json({
        requestedPost: post,
        request: {
          type: ["PATCH", "DELETE"],
          url: "http://localhost:5000/posts/" + post._id,
          description: "update/ delete the data from this specific post",
        },
      });
    } else {
      return res.status(404).json({
        message: `no entry with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createNewPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const data = await newPost.save();
    res.status(201).json({
      createdUser: data,
      request: {
        type: "GET",
        url: "http://localhost:5000/posts/" + data._id,
        description: "get the data for this specific post",
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (post) {
      res.status(200).json({
        updatedPost: post,
        request: {
          type: "GET",
          url: "http://localhost:5000/posts/" + post._id,
          description: "get the data for this specific post",
        },
      });
    } else {
      return res.status(404).json({
        message: `no post with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndRemove(id);
    if (post) {
      res.status(200).json({
        deletedPost: post,
        request: {
          type: "GET",
          url: "http://localhost:5000/posts",
          description: "get the data for all posts",
        },
      });
    } else {
      return res.status(404).json({
        message: `no post with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};
