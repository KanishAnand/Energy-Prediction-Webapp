const router = require("express").Router();
let Product = require("./../models/product");

// Get all the products
router.route("/").get(function(req, res) {
  Product.find({})
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => res.status(400).json(err));
});

// Adding a new product of the vendor
router.route("/add").post(function(req, res) {
  let product = new Product(req.body);
  product
    .save()
    .then(product => {
      res.status(200).json({ product: "Product Added Successfully" });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// view all the products of a particular status
router.route("/status").post(function(req, res) {
  Product.find({ status: req.body.status })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => res.status(400).json(err));
});

// get all the products for given product name
router.route("/search").post(function(req, res) {
  if (req.body.name === "" || req.body.name === undefined) {
    Product.find({ status: "waiting" })
      .then(products => {
        res.status(200).json(products);
      })
      .catch(err => res.status(400).json(err));
  } else {
    Product.fuzzySearch(req.body.name, function(err, products) {
      res.status(200).json(products);
    });
  }
});

// view the product
router.route("/id").post(function(req, res) {
  Product.findOne({ _id: req.body.id })
    .then(product => {
      res.status(200).json(product);
    })
    .catch(err => res.status(400).json(err));
});

// view all the products of the vendor
router.route("/view").post(function(req, res) {
  Product.find({ username: req.body.username, status: req.body.status })
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => res.status(400).json(err));
});

// deletes the product
router.route("/delete").post(function(req, res) {
  Product.deleteOne({ _id: req.body.id })
    .exec()
    .then(product =>
      res.status(200).json({ Product: "Product deleted successfully!" })
    )
    .catch(err => {
      res.status(400).json(err);
    });
});

// changes the status of the product
router.route("/changeStatus").post(function(req, res) {
  Product.findByIdAndUpdate(req.body.id, { $set: { status: req.body.status } })
    .then(product =>
      res.status(200).json({ Product: "Product status changed successfully!" })
    )
    .catch(err => {
      res.status(400).json(err);
    });
});

// changes the quantity of the product
router.route("/order").post(function(req, res) {
  Product.findOne({ _id: req.body.id })
    .then(product => {
      if (product.ordered + req.body.order === product.quantity) {
        Product.findByIdAndUpdate(req.body.id, {
          $set: { ordered: product.ordered + req.body.order, status: "placed" }
        })
          .then(response => res.status(200).json(response))
          .catch(err => {
            res.status(400).json(err);
          });
      } else if (
        product.ordered + req.body.order < product.quantity &&
        product.ordered + req.body.order >= 0
      ) {
        Product.findByIdAndUpdate(req.body.id, {
          $set: { ordered: product.ordered + req.body.order, status: "waiting" }
        })
          .then(response => {
            res.status(200).json(response);
          })
          .catch(err => {
            res.status(400).json(err);
          });
      } else {
        res.status(400).json("Error: Order Unsucessfull!");
      }
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
