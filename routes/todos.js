const express = require('express');
const router = express.Router();
const http = require('http');
const request = require('request');
const axios = require('axios');
const dbconfig = require('../config/database.js');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);

//TODO : db transaction 관리 (commit/rollback)
router.get('/', (req, res, next) => {
    connection.query(`select id, name from todo`, function (err, rows) {
        if (err) {
            throw err;
        }
        console.log('rows : ' + rows);
        res.send(rows);
    });
});

router.post('/add', (req, res, next) => {
    if (req.body.name) {
        connection.query(`insert into todo(name) values ('` + req.body.name + `')`, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result.insertId);
            res.send(result);
        });
    } else {
        res.status(400);
        next('bad request');
    }
});

router.delete('/remove/:id', (req, res, next) => {
    console.log('id : ' + req.params.id);
    if (req.params.id) {
        connection.query(`delete from todo where id = '` + req.params.id + `'`, function (err, rows) {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send(rows);
        });
    } else {
        res.status(400);
        next('bad request');
    }
});

module.exports = router;
