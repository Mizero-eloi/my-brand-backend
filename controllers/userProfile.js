const _ = require("lodash");
const { validateUserProfile, User } = require("../models/User");
const updateCollection = require("../services/updateCollection");

module.exports.userProfile = async (req, res, next) => {
  // Validating the user's details
  const { error } = validateUserProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validating if the profile is his or hers
  if (req.user._id !== req.params.id) {
    return res
      .status(403)
      .send("Access denied! You can't update a profile which is not yours !");
  }

  // Finally updating the table
  try {
    // Validating if the given user exists & updating if ever it finds the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found !");
    res
      .status(200)
      .send(
        _.pick(updatedUser, [
          "id",
          "username",
          "email",
          "isAdmin",
          "DateCreated",
        ])
      );
  } catch (ex) {
    res.status(500).send("Something went wrong");
    console.log(ex);
  }
};

module.exports.userProfilePicture = async (req, res, next) => {
  // Validating if the profile is his or hers
  if (req.user._id !== req.params.id) {
    return res
      .status(403)
      .send("Access denied! You can't update a profile which is not yours !");
  }

  // Updating the collection using the helper function in services 👌😎
  updateCollection(User, req.params.id, { profile: req.file.path }, res);
};
