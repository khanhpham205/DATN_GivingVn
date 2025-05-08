const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWTSECRET = process.env.JWT_SECRET;

const rolecanadd = [
    "kol",
    "adminlvl1_Bac",
    "adminlvl1_Trung",
    "adminlvl1_Nam", 
    "admin"
]
const roleadmin = [
    "adminlvl1_Bac",
    "adminlvl1_Trung",
    "adminlvl1_Nam", 
    "admin"
]


// Middleware xác thực người dùng
function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'vui long dang nhap' });
    
    jwt.verify(token, JWTSECRET, (err, user) => {
        if (err) return res.status(402).json({ error: 'tai khoang khong ton tai' });
        req.user = user;
        next();
    });

}

// Middleware kiểm tra quyền KOL
function ckKOL(req, res, next) {
    if (req.user?.role == 'kol' || req.user?.role == 1) {
        next();
    }else{
        return res.status(405);
    }
}

function ckcanaddpj(req, res, next) {
    // if (req.user?.role == 'kol' || req.user?.role=='admin') {
    if (rolecanadd.includes(req.user.role) ){
        if(req.user?.role=='kol'){
            next();
        }else{
            req.addforce=true
        }
    }else{
        return res.status(405);
    }
}

// Middleware kiểm tra quyền admin khu vuc
// admin tổng đc phân role admin khu vực cho người khác 
function ckAdmin(req, res, next) {

    // if (req.user?.role == 'adminlvl1' || req.user?.role == 1) {
    if (roleadmin.includes(req.user?.role)) {
        if(req.user?.role=='admin'){
            req.admin = true
        }
        next();
    }
    return res.status(405);
}

module.exports = { auth, ckKOL, ckAdmin };