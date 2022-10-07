var express = require("express");
var router = express.Router();

const multer = require("multer");

/* model */
const { Post } = require("../Model/Post.js");

/* 
    image upload 
    diskSotrage : multer 로 전달받은 파일을 우리 disk에 저장을 하겠다.
*/
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "image/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage: storage }).single("file");


router.post("/image/upload", (req, res) => {

    upload(req, res, err => {

        if (err) {

            res.status(400).json({ success: false });

        } else {

            res.status(200).json({ success: true, filePath: res.req.file.path })

        }

    })

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