const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  profile: {
    type: String,
  },
  DateCreated: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      profile: this.profile,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

const validateUserEntry = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(8).required(),
  });

  return schema.validate(user);
};

const validateUserProfile = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(user);
};

const validateUserLogin = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(8).required(),
  });

  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUserEntry = validateUserEntry;
module.exports.validateUserLogin = validateUserLogin;
module.exports.validateUserProfile = validateUserProfile;
