const router = require("express").Router();
let Vendor = require("./../models/vendor");

// view vendor by username
router.route("/view").post(function(req, res) {
  Vendor.find({ username: req.body.username })
    .then(vendor => {
      res.status(200).json(vendor);
    })
    .catch(err => res.status(400).json(err));
});

// adds rating of vendor
router.route("/rate").post(function(req, res) {
  Vendor.findOne({
    username: req.body.username
  })
    .then(view => {
      if (!view) {
        let vendor = new Vendor({
          username: req.body.username,
          rating: req.body.rating,
          count: 1
        });
        vendor
          .save()
          .then(vendor => {
            res.status(200).json({ vendor: "Rating Added Successfully" });
          })
          .catch(err => {
            res.status(400).send(err);
          });
      } else {
        Vendor.findByIdAndUpdate(view._id, {
          $set: {
            rating:
              (view.rating * view.count + req.body.rating) / (view.count + 1),
            count: view.count + 1
          }
        })
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    })
    .catch(err => res.status(400).json(err));
});

// get all vendors
router.route("/").get(function(req, res) {
  Vendor.find({})
    .then(vendors => {
      res.status(200).json(vendors);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
