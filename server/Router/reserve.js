var express = require("express");
const moment = require("moment");
var router = express.Router();

/* model */
const { Reserve } = require("../Model/Reserve.js");

router.post("/submit", (req, res) => {

    let temp = {
        reserveType: req.body.reserveType,
        reserveDate: req.body.reserveDate,
        reserveName: req.body.reserveName,
        reserveEtc: req.body.reserveEtc,
    }

    const tempReserve = new Reserve(temp);

    tempReserve.save().then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false });
    })

})

router.post("/delete", (req, res) => {

    let temp = {
        reserveId: req.body.reserveId,
    }

    Reserve.deleteOne({ _id: temp.reserveId }).exec().then(() => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(400).json({ success: false });
    })

})

router.post("/list", (req, res) => {

    Reserve.find({ $and: [{ reserveType: req.body.sort }, { reserveDate: { $gte: moment(Date.now()).format("YYYY-MM-DD") } }] }).sort({ reserveDate: 1 }).exec().then((doc) => {
        res.status(200).json({ success: true, reserveList: doc });
    }).catch((err) => {
        res.status(400).json({ success: false });
        console.log(err);
    })

})

router.post("/calendarList", (req, res) => {

    let temp = {
        firstDate: req.body.firstDate,
        endDate: req.body.endDate,
    }

    Reserve.find({ reserveDate: { $gte: temp.firstDate, $lte: temp.endDate } }).sort({ reserveDate: 1 }).exec().then((doc) => {
        res.status(200).json({ success: true, reserveList: doc });
    }).catch((err) => {
        res.status(400).json({ success: false })
    })
})

module.exports = router;