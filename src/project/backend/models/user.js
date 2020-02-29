const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    user_type: {
        type: String
    }
});

module.exports = mongoose.model('User', User);