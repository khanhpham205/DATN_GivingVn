var express = require('express');
var router = express.Router();

const C_Thanhtoan = require('../controllers/C_thanhtoan');



router.post('/create_VNPay',C_Thanhtoan.VNPAY_createPayment)



module.exports = router;