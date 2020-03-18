const router = require("express").Router();
let Review = require("./../models/review");

// view review by username
router.route("/view").post(function(req, res) {
  Review.find({ vendorname: req.body.vendorname })
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(err => res.status(400).json(err));
});

// edits review
router.route("/edit").post(function(req, res) {
  Review.findOne({
    vendorname: req.body.vendorname,
    username: req.body.username,
    productName: req.body.productName
  })
    .then(view => {
      if (!view) {
        let review = new Review(req.body);
        review
          .save()
          .then(review => {
            res.status(200).json({ review: "Review Added Successfully" });
          })
          .catch(err => {
            res.status(400).send(err);
          });
      } else {
        Review.findByIdAndUpdate(view._id, {
          $set: { rating: req.body.rating, review: req.body.review }
        })
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(400).json(err);
          });
      }
    })
    .catch(err => res.status(400).json(err));
});

// get all reviews
router.route("/").get(function(req, res) {
  Review.find({})
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
