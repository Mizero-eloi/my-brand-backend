const mongoose = require("mongoose");
const Joi = require("joi");
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  author: {
    type: new mongoose.Schema({
      name: {
        type: String,
        unique: true,
        minlength: 4,
        maxlength: 50,
      },
    }),
  },
  content: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 1000000,
  },
  image: {
    type: String,
    minlength: 5,
    maxlength: 1000,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("article", articleSchema);

const validateArticle = (message) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(4).max(255).required(),
    content: Joi.string().min(100).max(1000000).required(),
  });

  return schema.validate(message);
};

module.exports.Article = Article;
module.exports.validateArticle = validateArticle;
