const router = require("express").Router();
const { spawn } = require("child_process");
const fs = require("fs");

// returns predicted energy value for given time range
router.route("/predict").post(function (req, res) {
  try {
    const process = spawn("python3", [
      "./models/model.py",
      "predict",
      req.body.fromDate,
      req.body.fromTime,
      req.body.toDate,
      req.body.toTime,
    ]);
    process.stdout.on("data", (data) => {
      let fileName = data.toString().split("\n")[0];
      let output = require("../models/" + fileName);
      delete require.cache[require.resolve("../models/" + fileName)];
      fs.unlinkSync("./models/" + fileName);
      res.status(200).send(output);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// returns graph of the predicted energy values for given time range
router.route("/graph").post(function (req, res) {
  try {
    const process = spawn("python3", [
      "./models/model.py",
      "graph",
      req.body.fromDate,
      req.body.fromTime,
      req.body.toDate,
      req.body.toTime,
    ]);
    process.stdout.on("data", (data) => {
      res.status(200).send(data.toString().split("\n")[0]);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
