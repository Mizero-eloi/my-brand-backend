const { User, validateUserEntry } = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");

module.exports.userRegistration = async (req, res, next) => {
  try {
    // validate the user's given data and return if it is not valid
    const { error } = validateUserEntry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user  already exists and return it true

    let user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (user) return res.status(400).send("User does already exists !");

    user = new User(_.pick(req.body, ["email", "username", "password"]));

    // hashing the password

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // Checking if the user is the admin

    if (user.email == "eloimizero123@gmail.com") {
      user.isAdmin = true;
    }
    // saving the user and providing them token
    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "username", "email", "isAdmin"]));
  } catch (ex) {
    res.status(500).send("Something went wrong");
    console.log(ex);
  }
};
