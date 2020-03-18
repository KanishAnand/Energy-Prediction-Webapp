const router = require("express").Router();

// returns energy prediction
router.route("/predict").post(function(req, res) {
  res.status(200).json({ output: "200" });
});

module.exports = router;
