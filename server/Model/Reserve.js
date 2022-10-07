const mongoose = require("mongoose");
const moment = require("moment");

const reserveSchema = new mongoose.Schema({
    reserveType: String,
    reserveDate: Date,
    reserveName: String,
    reserveEtc: String,
}, { collection: "reserve", timestamps: true })

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = { Reserve }