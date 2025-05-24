var express = require('express');
var router = express.Router();
const { auth, ckAdmin } = require('../middlewares/auth')

const C_donation = require('../controllers/C_donation');
const C_thanhtoan = require('../controllers/C_thanhtoan');

router.post('/donate/:id'       , auth, C_donation.addDonation);

router.post('/donate/vnpay/:id' , auth, 
    C_donation.checkDonate, 
    C_donation.VNPAY_createPayment
);

router.post('/donate/momo/:id' , auth, 
    C_donation.checkDonate, 
    C_donation.MOMO_createPayment
);



router.get('/vnpay_return'    , C_thanhtoan.VNPAY_return);






module.exports = router;
