const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

let Product = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ordered: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "waiting"
  }
});

Product.plugin(mongoose_fuzzy_searching, { fields: ["name"] });
module.exports = mongoose.model("Product", Product);
