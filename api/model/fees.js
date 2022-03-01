const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    feeamount: Number,
    studentid: "",
    time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Fees', feesSchema);