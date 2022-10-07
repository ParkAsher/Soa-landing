const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    infoType: String,
    info: String
}, { collection: "info", timestamps: true })

const Info = mongoose.model("Info", infoSchema);

module.exports = { Info }