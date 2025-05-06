var express = require('express');
var router = express.Router();
const { auth, ckKOL, ckAdminlvl1 } = require('../middlewares/auth')

const fs = require('fs');
const path = require('path');
var multer = require('multer')
const allowedFields = ['f_img', 'b_img', 'video'];

const passport = require('passport');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.user.userId);
        const userDir = path.join('public/KYC', req.user.userId);
        fs.mkdir(userDir, { recursive: true }, (err) => {
            if (err) {
                return cb(err, userDir);
            }
            cb(null, userDir);
        });        
    },
    filename: function (req, file, cb) {
        if (!allowedFields.includes(file.fieldname)) {
            return cb(new Error('Invalid field name'));
        }
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}${ext}`;
        cb(null, filename);
    }
});
const upload = multer({ 
    storage: storage
});

const C_User = require('../controllers/C_user');


// GG OAuth
router.get('/login/google'   ,
    passport.authenticate('google', {scope: ['profile', 'email']})
);
router.get('/login/google/cb' ,
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res, next) => {
        console.log('User authenticated successfully:', req.user);
        next();
    },
    C_User.GGOauthsuccess
);

// Facebook OAuth
router.get('/login/facebook', 
    passport.authenticate('facebook', { scope: ['email'] })
);
router.get('/login/facebook/cb',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    C_User.FBOauthsuccess
);

router.post('/register'  , C_User.register);
router.post('/login'     , C_User.login);
router.get('/check'     , auth, C_User.check);



router.get('/kyccheck' , auth, C_User.KYC_check);

router.post('/userkyc1'  , auth, upload.single('f_img'), C_User.KYC_step1);










module.exports = router;
