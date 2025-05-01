var express = require('express');
var router = express.Router();

// const Product = require('../models/M_products')

router.get('/', function(req, res) {
    res.status(200).json({
        status:true,
        message:''
    })
});



router.post('/add',async(req,res)=>{
    console.log(req.body);

    
    res.status(200).json({
        status:true
    })
})

module.exports = router;
