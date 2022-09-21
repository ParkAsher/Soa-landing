const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {

    console.log(`Reservation Viewer app listening at http://localhost:${port}`);

})