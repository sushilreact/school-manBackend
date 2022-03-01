const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fathername: { type: String, required: true },
    mothername: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    studentclass: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    admin: String,
    time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Student', studentSchema);