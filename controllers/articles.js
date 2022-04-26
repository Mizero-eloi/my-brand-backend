const express = require("express");
const {
  Article,
  validateArticle,
  validateComment,
} = require("../models/Article"); // new
const updateCollection = require("../services/updateCollection");

// Get all posts
module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (ex) {
    res.status(500).send("Something went wrong");
    console.log(ex);
  }
};

// Creating a post api

module.exports.createArticle = async (req, res) => {
  try {
    // validate the user's given data and return if it is not valid
    // const { error } = validateArticle(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // Getting data from request body

    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: {
        _id: req.user._id,
        name: req.user.username,
      },
    });

    await article.save();
    res.status(200).send(article);
  } catch (ex) {
    res.status(500).send("Something went wrong");
    console.log(ex);
  }
};

// Posting an article image
module.exports.postImage = async (req, res) => {
  // Updating the collection using the helper function in services 👌😎

  updateCollection(Article, req.params.id, { image: req.file.path }, res);
};

// Getting a single post

module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    res.status(200).send(article);
  } catch {
    res.status(404);
    res.send("Article does not exist!");
  }
};

// Updating the post

module.exports.updateArticle = async (req, res) => {
  // validate the user's given data and return if it is not valid
  // const { error } = validateArticle(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // And finally updating the given data
  updateCollection(
    Article,
    req.params.id,
    { title: req.body.title, content: req.body.content },
    res
  );
};

// Deleting the post

module.exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedArticle);
  } catch {
    res.status(404);
    res.send({ error: "Article doesn't exist!" });
  }
};

// Comment on article

module.exports.commentArticle = async (req, res) => {
  // Validate the comment
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Validating if the article exists
  let article = await Article.findOne({ _id: req.params.id });
  if (!article) return res.status(400).send("Oops! Article does not exist !");

  // Comment on article
  article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: {
          commenter: req.user.username,
          message: req.body.message,
        },
      },
    },
    { new: true }
  );

  // Returning the article
  res.status(200).send(article);
};

// Like an article

module.exports.likeArticle = async (req, res) => {
  // Validating if the article exists
  let article = await Article.findOne({ _id: req.params.id });
  if (!article) res.status(400).send("Oops! Article does not exist !");

  // liking the article

  article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        likes: {
          username: req.user.username,
          _id: req.user._id,
        },
      },
    },
    { new: true }
  );

  // Returning the article
  res.status(200).send(article);
};
