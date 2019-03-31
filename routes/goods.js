var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
const axios = require('axios');

router.get('/', (req, res, next) => {
    http.request('http://127.0.0.1:8000/goods', (response) => {
        //console.log(response.body);
        //res.send(JSON.parse(response));
        response.pipe(res);
    }).on('error', e => {
        res.sendStatus(500);
    }).end();
});

router.post('/', (req, res, next) => {
    const params = {
        name : req.body.name,
        category : req.body.category,
        price : Number(req.body.price),
        description : req.body.description
    };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('http://127.0.0.1:8000/goods', params, config)
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
});

router.delete('/', (req, res, next) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.delete('http://127.0.0.1:8000/goods?id=' + req.query.id, {}, config)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;
