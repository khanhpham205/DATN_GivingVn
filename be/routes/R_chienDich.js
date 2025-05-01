var express = require('express');
var router = express.Router();

// const Product = require('../models/M_products')

router.get('/', function(req, res, next) {
    res.status(200).json({
        status:true,
        message:''
    })
});

module.exports = router;
