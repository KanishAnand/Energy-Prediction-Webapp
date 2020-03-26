const router = require("express").Router();

// returns energy prediction
router.route("/predict").post(function(req, res) {
  try {
    const { spawn } = require("child_process");
    const process = spawn("python3", [
      "./routes/model.py",
      req.body.date,
      req.body.time
    ]);
    process.stdout.on("data", data => {
      res.status(200).end(data.toString());
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
