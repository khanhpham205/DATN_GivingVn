var express = require('express');
var router = express.Router();
const { auth, ckAdmin } = require('../middlewares/auth')

const C_Danhmuc = require('../controllers/C_danhmuc');

router.get( '/'         , C_Danhmuc.getDanhMuc)
router.post('/add'      , auth, ckAdmin, C_Danhmuc.addDanhMuc)
router.put( '/edit/:id' , auth, ckAdmin, C_Danhmuc.editDanhMuc)
router.post('/del'      , auth, ckAdmin, C_Danhmuc.delDanhMuc)
 
module.exports = router;
