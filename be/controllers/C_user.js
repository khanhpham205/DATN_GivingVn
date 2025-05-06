const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require("../models/M_user");
const KYC =  require('../models/M_KYC');

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
            process.env.JWT_SECRET, { expiresIn: '3d' }
        );

        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const register = async (req, res) => {

    const name        = req.body.name?.trim()
    const email       = req.body.email?.trim()
    const password    = req.body.password?.trim()
    const phonenumber = req.body.phonenumber?.trim()


    if (!name || !email || !password || !phonenumber) {
        return res.status(400).json({ error: "Vui lòng không để trống thông tin" });
    }
    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { phonenumber }],
        });

        if (existingUser) {
            return res.status(401).json({ error: "Email hoặc phoneNumber đã tồn tại" });
        }
        const newUser = new User({
            name,
            email,
            phonenumber,
            password,
            provider:'local'
        });
        newUser.save();
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};

const check = async (req, res) => {
    const data = req.user
    try {
        
        if(data){
            const user = await User.findById(req.user.userId)
            data.name = user.name
            data.email = user.email
            data.phonenumber = user.phonenumber
            data.avatar = user.avatar
            data.role = user.role
            data._id = user._id
        }
        
        return res.status(200).json(data)
    } catch (error) {return res.status(500).json({ status: false, error })}
}

const GGOauthsuccess = async(req, res)=>{
    const user = req.user;
    console.log(user);

    // Tạo JWT
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET, { expiresIn: '3d' }
    );
    return res.redirect(`http://localhost:3000/account?login=true&token=${token}`);
}
const FBOauthsuccess = async(req, res)=>{
    const user = req.user;
    console.log(user);

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET, { expiresIn: '3d' }
    );
    return res.redirect(`http://localhost:3000/account?login=true&token=${token}`);
}

const KYC_check = async (req, res) => {
    const user = req.user;
    try {
        // const usercheck = await KYC.findOne({user:user._id}).select('name age')
        const usercheck = await User.findOne({
            user:user._id
        }).select('name email phonenumber role provider dt_front_cccd dt_back_cccd')
        return res.status(200).json({usercheck});
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};

const KYC_step1 = async (req, res) => {
    try {
        const user = req.user;
        const filepath = req.file.path.replace('public', '');
        const usercheck = await User.findById(user.userId)
        
        usercheck.dt_front_cccd = filepath
        usercheck.verification_status=1
        await usercheck.save()

        return res.status(200).json({});
    } catch (error) {return res.status(500).json({error})}
};
const KYC_step2 = async (req, res) => {
    //lay f_img + b img call api + so sanh du lieu
    try {
       
        return res.status(200);
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};
const KYC_step3 = async (req, res) => {

    try {
       
        return res.status(200);
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};


module.exports = {
    login,
    register,
    KYC_step1,
    KYC_step2,
    KYC_step3,
    KYC_check,
    GGOauthsuccess,
    FBOauthsuccess,
    check,

}
