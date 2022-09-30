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

module.exports = router;