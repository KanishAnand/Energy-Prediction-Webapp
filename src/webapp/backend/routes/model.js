const router = require("express").Router();

// returns energy prediction
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
      let plist = require("../models/plist.json");
      res.status(200).send(plist);
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
