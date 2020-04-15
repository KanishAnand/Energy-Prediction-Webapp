const router = require("express").Router();
let User = require("./../models/user");

// Gets all the users
router.route("/").get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Adds a new user
router.route("/add").post(function (req, res) {
  let user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Login User
router.route("/login").post(function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username: username, password: password })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// finds user
router.route("/find").post(function (req, res) {
  User.findOne(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// checks if there exists any user with the given key for all keys
router.route("/exist").post(function (req, res) {
  let error = {};
  let cnt = 0;
  for (let key in req.body) {
    let info = {};
    info[key] = req.body[key];
    User.findOne(info)
      .then((user) => {
        if (user !== null) {
          error[key] = user;
        }
        cnt++;
        if (cnt === Object.keys(req.body).length) {
          res.status(200).json(error);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

// modify user's info
// req.body.id is the id of the user
// req.body.changes has all the fields to be modified
router.route("/modify").post(function (req, res) {
  User.findByIdAndUpdate(req.body.id, {
    $set: req.body.changes,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
