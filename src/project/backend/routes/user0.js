const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  // Hashing the code
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user
        .save()
        .then(user => res.json({ user: "Registered Successfully!" }))
        .catch(err => res.json(err));
    });
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
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(200).json(user);
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatching => {
        if (isMatching) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user._id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                token: token,
                user: user
              });
            }
          );
        } else {
          return res.status(200).json([]);
        }
      });
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
