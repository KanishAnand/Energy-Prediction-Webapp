const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    fromdate: {
        type: Date
    },
    fromtime: {
        type: Number
    },
    todate: {
        type: Date
    },
    totime: {
        type: Number
    },
    vendorname: {
        type: String
    },
    productstatus: {
        type: String
    }

});

module.exports = mongoose.model('Product', Product, 'product');