const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: String,
    email: { type: String, required: true },
    phone: Number,
    gender: String,
    userType: String
})

module.exports = mongoose.model('User', userSchema);