const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");

if (!config.get("serverPort") || !config.get("jwtPrivateKey")) {
  console.log("Jwt not configured");
  process.exit(-1);
}

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/my-brand", { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected Successfully !");
  });

const app = express();

// Using routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/contactMe", require("./routes/contactMeRoute"));
app.use("/signUp", require("./routes/userRegistrationRoute"));
app.use("/logIn", require("./routes/userLogInRoute"));
app.use("/article", require("./routes/articlesRoute"));
app.use("/userProfile", require("./routes/userProfileRoute"));
app.use("/users", require("./routes/userRoute"));

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server listening at port ${port}`);
});

module.exports = app;
