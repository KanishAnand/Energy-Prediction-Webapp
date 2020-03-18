const mongoose = require("mongoose");

let Customer = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.ObjectId,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Customer", Customer);
