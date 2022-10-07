var express = require("express");
var router = express.Router();

/* model */
const { Info } = require("../Model/Info.js");

router.post("/submit", (req, res) => {

    let temp = {
        infoType: req.body.infoType,
        info: req.body.info
    }

    const tempInfo = new Info(temp);

    tempInfo.save().then(() => {
        res.status(200).json({ success: true })
    }).catch((err) => {
        res.status(400).json({ success: false })
    })

})

router.post("/profileintro", (req, res) => {
    Info.findOne({ infoType: "intro" }).sort({ createdAt: -1 }).exec().then((doc) => {
        res.status(200).json({ success: true, intro: doc.info });
    }).catch((err) => {
        res.status(400).json({ success: false })
    })
})

router.post("/studiolocation", (req, res) => {
    Info.findOne({ infoType: "location" }).sort({ createdAt: -1 }).exec().then((doc) => {

        res.status(200).json({ success: true, location: doc.info });
    }).catch((err) => {
        res.status(400).json({ success: false });
    })
})

router.post("/studioetc", (req, res) => {
    Info.findOne({ infoType: "etc" }).sort({ createdAt: -1 }).exec().then((doc) => {

        res.status(200).json({ success: true, etc: doc.info });
    }).catch((err) => {
        res.status(400).json({ success: false });
    })
})

module.exports = router;