const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
});

userSchema.pre('save', function(next) {
    let user = this;
    next();
});

module.exports = mongoose.model("User", userSchema)