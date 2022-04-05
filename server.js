const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

if (!config.get("serverPort") || !config.get("jwtPrivateKey")) {
  console.log("Jwt not configured");
  process.exit(-1);
}

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/my-brand", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    // Using routes
    app.use(express.json());
    app.use("/contactMe", require("./routes/contactMeRoute"));
    app.use("/signUp", require("./routes/userRegistrationRoute"));
    app.use("/logIn", require("./routes/userLogInRoute"));
    app.use("/article", require("./routes/articlesRoute"));

    const port = process.env.PORT || config.get("serverPort");

    app.listen(5000, () => {
      console.log(`Server listening at port ${port}`);
    });
    console.log("Database Connected Successfully !");
  });
