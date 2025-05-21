var express = require('express');
var router = express.Router();

const C_Thanhtoan = require('../controllers/C_thanhtoan');



router.post('/create_VNPay',C_Thanhtoan.VNPAY_createPayment)
router.post('/vnpay_return',C_Thanhtoan.VNPAY_return)



module.exports = router;