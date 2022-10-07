var express = require("express");
var router = express.Router();

const multer = require("multer");

/* naver cloud platform S3 module */
const setUpload = require("../Util/upload.js");

/* model */
const { Post } = require("../Model/Post.js");


router.post("/image/upload", setUpload("soa-landing/post"), (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

router.post("/submit", (req, res) => {

    let temp = {
        imageType: req.body.imageType,
        image: req.body.image
    }

    const ImagePost = new Post(temp);

    ImagePost.save().then(() => {

        res.status(200).json({ success: true })

    }).catch((err) => {

        res.status(400).json({ success: false })
    })

})

router.post("/profileimage", (req, res) => {

    Post.findOne({ imageType: "profile" }).sort({ createdAt: -1 }).exec().then((doc) => {

        res.status(200).json({ success: true, filePath: doc.image });

    }).catch((err) => {

        res.status(400).json({ success: false })
    })

})

router.post("/studioimage", (req, res) => {

    Post.findOne({ imageType: "studio" }).sort({ createdAt: -1 }).exec().then((doc) => {

        res.status(200).json({ success: true, filePath: doc.image });

    }).catch((err) => {

        res.status(400).json({ success: false })
    })

})



module.exports = router;