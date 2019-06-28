var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
const axios = require('axios');
var dbconfig = require('../config/database.js');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig);

router.get('/', (req, res, next) => {
    connection.query('select id, name from todo', function (err, rows) {
        if (err) {
            throw err;
        }
        console.log('rows : ' + rows);
        res.send(rows);
    });
});

router.post('/add', (req, res, next) => {
    console.log(req.body);
    if (req.body.name) {
        var params = [req.body.name];
        connection.query('insert into todo(name) values (?)', params, function (err, rows, fields) {
            if (err) {
                throw err;
            }
            // TODO : new key 값 리턴
            res.send(rows.id);
        });
    } else {
        res.status(400);
        next('bad request');
    }
});

router.delete('/remove', (req, res, next) = >{

});

module.exports = router;
