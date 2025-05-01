const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWTSECRET = process.env.JWT_SECRET;

// Middleware xác thực người dùng
function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(req.headers['authorization']);
    if (!token) return res.status(401).json({ error: 'vui long dang nhap' });
    
    jwt.verify(token, JWTSECRET, (err, user) => {
        if (err) return res.status(402).json({ error: 'tai khoang khong ton tai' });
        req.user = user;
        next();
    });
}

// Middleware kiểm tra quyền admin
function ckKOL(req, res, next) {
    if (req.user?.role == 'kol' || req.user?.role == 1) {
        next();
    }else{
        return res.status(405);
    }
}

function ckAdminlvl1(req, res, next) {
    if (req.user?.role == 'adminlvl1' || req.user?.role == 1) {
        next();
    }else{
        return res.status(405);
    }
}

module.exports = { auth, ckAdmin };