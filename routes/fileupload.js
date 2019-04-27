var express = require('express');
var fileRouter = express.Router();
const multer = require('multer');
const stringutils = require('../utils/stringutils');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename : (req, file, cb) => {
        console.log(file);
        const fileName = stringutils.uuidgen() + req.params.id + '.jpg';
        cb(null, fileName);
    }
});

const upload = multer({
    storage : storage
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
