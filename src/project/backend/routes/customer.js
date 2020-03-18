const router = require("express").Router();
let Customer = require("./../models/customer");

// add order
router.route("/order").post(function(req, res) {
  let customer = new Customer(req.body);
  customer
    .save()
    .then(order => {
      res.status(200).json(order);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// view order by username
router.route("/view").post(function(req, res) {
  Customer.find({ username: req.body.username })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => res.status(400).json(err));
});

// edits
router.route("/edit").post(function(req, res) {
  if (!req.body.count) {
    Customer.deleteOne({ _id: req.body.id })
      .exec()
      .then(product => {
        res.status(200).json(product);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    Customer.findByIdAndUpdate(req.body.id, {
      $set: { count: req.body.count }
    })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
});

// get all orders
router.route("/").get(function(req, res) {
  Customer.find({})
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
