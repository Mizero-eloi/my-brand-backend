const { User } = require("../models/User");

// Get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (ex) {
    res.status(500).send("Something went wrong");
    console.log(ex);
  }
};

// Getting a single user

module.exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
};
