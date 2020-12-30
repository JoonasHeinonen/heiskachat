const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    message: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
});

module.exports = mongoose.model("Message", messageSchema)