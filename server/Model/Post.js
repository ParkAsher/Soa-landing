const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    image: String
}, { collection: "posts", timestamps: true })

const Post = mongoose.model("Post", postSchema);

module.exports = { Post }