const express = require("express");
const { Article, validateArticle } = require("../models/Article"); // new

// Get all posts
module.exports.getAllArticles = async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
};

// Creating a post api

module.exports.createArticle = async (req, res) => {
  try {
    // validate the user's given data and return if it is not valid
    const { error } = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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

// Getting a single post

module.exports.getOneArticle = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

// Updating the post

module.exports.updateArticle = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};

// Deleting the post

module.exports.deleteArticle = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedPost);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
