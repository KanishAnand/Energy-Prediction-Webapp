const mongoose = require("mongoose");

let Vendor = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 1
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Vendor", Vendor);
