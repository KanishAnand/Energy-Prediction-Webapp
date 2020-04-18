const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./outputs"));

// Connection to mongodb
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://127.0.0.1:27017/");
const connection = mongoose.connection;
connection.once("open", function () {
  // connection.dropDatabase();
  console.log("MongoDB database connection established succesfully.");
});

const userRoutes = require("./routes/user");
const modelRoutes = require("./routes/model");

app.use("/user", userRoutes);
app.use("/model", modelRoutes);

app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});
