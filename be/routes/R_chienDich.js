var express = require('express');
var router = express.Router();
var multer = require('multer')
const mongoose = require('mongoose');
const path = require('path') 

const { auth, ckKOL, ckAdminlvl1, ckcanaddpj } = require('../middlewares/auth')
const C_chiendich = require('../controllers/C_chiendich');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/chiendich');
    },
    filename: function (req, file, cb) {
        const id = new mongoose.Types.ObjectId();
        req.body._id = id.toString();

        const ext = path.extname(file.originalname);
        const filename = `Cd-${id}${ext}`;
        cb(null, filename);
    }
});
const upload = multer({ 
    storage: storage
});


router.get('/', function(req, res, next) {
    res.status(200).json({
        status:true,
        message:''
    })
});

router.post('/add', auth,ckcanaddpj, upload.single('img'), C_chiendich.addChienDich);




module.exports = router;
