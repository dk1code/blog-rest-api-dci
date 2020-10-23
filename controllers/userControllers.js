const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        requestedUser: user,
        request: {
          type: ["PATCH", "DELETE"],
          url: "http://localhost:5000/users/" + user._id,
          description: "update/ delete the data from this specific user",
        },
      });
    } else {
      return res.status(404).json({
        message: `no user with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const data = await newUser.save();
    res.status(201).json({
      createdUser: data,
      request: {
        type: "GET",
        url: "http://localhost:5000/users/" + data._id,
        description: "get the data for this specific user",
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json({
        updatedUser: user,
        request: {
          type: "GET",
          url: "http://localhost:5000/users/" + user._id,
          description: "get the data for this specific user",
        },
      });
    } else {
      return res.status(404).json({
        message: `no user with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    if (user) {
      res.status(200).json({
        deletedUser: user,
        request: {
          type: "GET",
          url: "http://localhost:5000/users",
          description: "get the data for all users",
        },
      });
    } else {
      return res.status(404).json({
        message: `no user with id ${id} found`,
      });
    }
  } catch (err) {
    next(err);
  }
};
