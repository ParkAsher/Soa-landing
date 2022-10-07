const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');

/*
    config
*/
const config = require("../config/key.js");

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: config.access_key,
        secretAccessKey: config.secret_key
    }
});


function setUpload(bucket) {

    let upload = multer({

        storage: multerS3({
            s3: S3,
            bucket: bucket,
            acl: "public-read-write",
            key: function (req, file, cb) {

                // extname : 주어진 이름에서 확장자를 제거해서 남겨주는
                let extension = path.extname(file.originalname);

                cb(null, Date.now().toString() + extension);
            },

        })
    }).single("file");

    return upload;
}

module.exports = setUpload;