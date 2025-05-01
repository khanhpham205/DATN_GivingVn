var express = require('express');
var router = express.Router();

// const User = require('../models/M_user');
const C_User = require('../controllers/C_user');

router.get('/:id', function(req, res, next) {
    
});

router.post('/login',    C_User.login);
router.post('/register', C_User.register);
module.exports = router;
