const mongoose = require("mongoose");

let Review = new mongoose.Schema({
  vendorname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String
  }
});

module.exports = mongoose.model("Review", Review);
