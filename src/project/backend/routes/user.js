const router = require("express").Router();
let User = require("./../models/user");

// Gets all the users
router.route("/").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Adds a new user
router.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: "Registered Successfully!" });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Check if username exists
router.route("/exist").post(function(req, res) {
  username = req.body.username;
  User.find({ username: username })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(400).json(err));
});

// Login User
router.route("/login").post(function(req, res) {
  username = req.body.username;
  password = req.body.password;
  User.findOne({ username: username, password: password })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Getting a user by id
router.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
