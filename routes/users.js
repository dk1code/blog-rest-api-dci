const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");

const {
  getAllUsers,
  createNewUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = controllers;

router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
