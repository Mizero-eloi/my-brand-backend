const {
  validateContactMeMessage,
  ContactMe,
} = require("../models/contactMeModel");
const _ = require("lodash");

module.exports.postContactMeMessage = async (req, res, next) => {
  try {
    // validating the user's input(for make challenge form )

    const { error } = validateContactMeMessage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Getting the message from the request body
    const contactMeMessage = new ContactMe(
      _.pick(req.body, "name", "email", "message")
    );
    await contactMeMessage.save();
    res.send(contactMeMessage);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong !");
  }
};

module.exports.getAllMeMessages = async (req, res, next) => {
  try {
    const allMessages = await ContactMe.find();
    res.status(200).send(allMessages);
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Something went wrong !");
  }
};
