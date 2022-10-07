const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

/* config */
const config = require("./server/config/key.js");

app.use("/image", express.static("./server/image"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    mongoose.connect(config.mongoURI).then(() => {

        console.log(`Reservation Viewer app listening at http://localhost:${port}`);
        console.log("Connecting MongoDB...");

    }).catch((err) => {

        console.log(`${err}`);

    })

})

/* 
    Router
    /api/ .. 
    ex) /api/user : user에 관련된 router 
*/
app.use("/api/post", require("./server/Router/post.js"));
app.use("/api/info", require("./server/Router/info.js"));
app.use("/api/reserve", require("./server/Router/reserve.js"));