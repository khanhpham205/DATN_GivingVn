const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const JWTSECRET = process.env.JWT_SECRET;

const rolecanadd = [
    "kol",
    "adminlvl1_zone0",
    "adminlvl1_zone1",
    "adminlvl1_zone2",  
    "admin"
]
const roleadmin = [
    "adminlvl1_zone0",
    "adminlvl1_zone1",
    "adminlvl1_zone2",  
    "admin"
]

// Middleware xác thực người dùng
function auth(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'vui long dang nhap' });
    
    jwt.verify(token, JWTSECRET, (err, user) => {
        if (!!err) return res.status(402).json({ error: 'tai khoang khong ton tai' });
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
    if (rolecanadd.includes(req.user.role)){
        if( req.user.role != 'kol' ){
            req.addforce=true
            switch (req.user.role) {
                case 'adminlvl1_Bac':
                    req.body.zone = 'Bac';
                    break;
                case 'adminlvl1_Trung':
                    req.body.zone = 'Trung';
                    break;
                case 'adminlvl1_Nam':
                    req.body.zone = 'Nam';
                    break;
            }
        }
        next();
    }else{
        return res.status(405);
    }
}

// admin tổng đc phân role admin khu vực cho người khác 
function ckAdmin(req, res, next) {

    if (roleadmin.includes(req.user?.role)) {
        if(req.user?.role=='admin'){
            console.log('admin');
            req.admin = true
        }
        console.log('admin khu vực');
        req.canaccept = true 
        next();
    }
    return res.status(405);
}

module.exports = { auth, ckKOL, ckAdmin, ckcanaddpj };