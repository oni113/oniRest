var express = require('express');
var fileRouter = express.Router();
const multer = require('multer');
const stringutils = require('../utils/stringutils');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename : (req, file, cb) => {
        const originFileName = file.originalname;
        const fileSize = file.size;
        console.log('fileSize : ' + fileSize);
        var lastDot = originFileName.lastIndexOf('.');
        var fileExt = originFileName.substring(lastDot, originFileName.length).toLowerCase();
        const savedFileName = originFileName.substring(0, lastDot) + '-' + stringutils.uuidgen() + fileExt;
        cb(null, savedFileName);
    }
});

const upload = multer({
    storage : storage,
    limits: { fileSize: 1 * 1024 * 1024 }
}).single('myfile');

fileRouter.post('/upload/:id', (req, res, next) => {
    console.log(req.body.id);
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

module.exports = fileRouter;
