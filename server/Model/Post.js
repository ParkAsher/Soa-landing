const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    imageType: String,
    image: String
}, { collection: "posts", timestamps: true })

const Post = mongoose.model("Post", postSchema);

module.exports = { Post }