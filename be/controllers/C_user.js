const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require("../models/M_user");
// const KYC =  require('../models/M_KYC');

//GET


//POST
const login = async (req, res) => {
    // 400 thong tin nhap vao ko du
    // 404 khong tim thay user
    // 401 sai mk
    // 500 loi khong xac dinh
    // 200 dn tc

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    try {
        
        const user = await User.findOne({
            $or: [{ email: email.trim() }, { phonenumber: email.trim() }],
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // console.log(123);
        const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ error });
    }
};


const register = async (req, res) => {

    const name        = req.body.name.trim()
    const email       = req.body.email.trim()
    const password    = req.body.password.trim()
    const phonenumber = req.body.phonenumber.trim()


    if (!name || !email || !password || !phonenumber) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await User.findOne({
        $or: [{ email }, { phonenumber }],
    });

    if (existingUser) {
        return res.status(400).json({ error: "Email or phoneNumber already exists" });
    }
    try {
        const newUser = new User({
            name,
            email,
            phonenumber,
            password,
        });
        newUser.save();
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};


module.exports = {
    login,
    register
}
