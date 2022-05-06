const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

if (!config.get("serverPort") || !config.get("jwtPrivateKey")) {
  console.log("Jwt not configured");
  process.exit(-1);
}
const app = express();

require("./startup/prod")(app);
// Connect to MongoDB database
mongoose
  .connect("mongodb+srv://eloi:ae789789@my-brand.etgh9.mongodb.net/test", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected Successfully !");
  });

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "My-brand API",
      description: "My-brand all apis",
      contact: {
        name: "MIZERO Eloi",
      },
      servers: ["http://localhost:5000"],
      version: "1.0.1",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDoc = require("./documentation.json");
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, false, { docExpansion: "none" })
);

// Using routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, false, { docExpansion: "none" })
);
app.use("/contactMe", require("./routes/contactMeRoute"));
app.use("/signUp", require("./routes/userRegistrationRoute"));
app.use("/logIn", require("./routes/userLogInRoute"));
app.use("/article", require("./routes/articlesRoute"));
app.use("/userProfile", require("./routes/userProfileRoute"));
app.use("/users", require("./routes/userRoute"));

const port = process.env.PORT || config.get("serverPort");

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

module.exports = app;
