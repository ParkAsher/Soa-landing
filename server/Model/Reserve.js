const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    reserveType: String,
    reserveDate: Date,
    reserveName: String,
    reserveEtc: String,
}, { collection: "reserve", timestamps: true})

const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = { Reserve } 