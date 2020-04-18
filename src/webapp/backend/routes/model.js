const router = require("express").Router();

// returns predicted energy value for given time range
router.route("/predict").post(function (req, res) {
  try {
    const { spawn } = require("child_process");
    const process = spawn("python3", [
      "./routes/model.py",
      "predict",
      req.body.fromDate,
      req.body.fromTime,
      req.body.toDate,
      req.body.toTime,
    ]);
    process.stdout.on("data", (data) => {
      let output = require("../outputs/data.json");
      delete require.cache[require.resolve("../outputs/data.json")];
      res.status(200).send(output);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// returns graph of the predicted energy values for given time range
router.route("/graph").post(function (req, res) {
  try {
    const { spawn } = require("child_process");
    const process = spawn("python3", [
      "./routes/model.py",
      "graph",
      req.body.fromDate,
      req.body.fromTime,
      req.body.toDate,
      req.body.toTime,
    ]);
    process.stdout.on("data", (data) => {
      // let output = require("../models/data.json");
      // delete require.cache[require.resolve("../models/data.json")];
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
