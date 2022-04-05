const mongoose = require("mongoose");
const Joi = require("joi");
const contactMeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000,
  },
  DateCreated: {
    type: Date,
    default: Date.now,
  },
});

const ContactMe = mongoose.model("contact", contactMeSchema);

const validateContactMeMessage = (message) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    message: Joi.string().min(5).max(1000).required(),
  });

  return schema.validate(message);
};

module.exports.ContactMe = ContactMe;
module.exports.validateContactMeMessage = validateContactMeMessage;
