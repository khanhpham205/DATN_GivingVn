const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
const form = require('form-data')
const axios = require('axios')
require('dotenv').config()
const User = require("../models/M_user");


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
    try {
        const user = req.user;
        const usercheck = await User.findOne({
            user:user._id
        }).select('name email phonenumber role provider dt_front_cccd dt_back_cccd verification_status flag')
        return res.status(200).json({usercheck});
    } catch (error) {
        return res.status(500).json({ status: false, error });
    }
};

const KYC_step1 = async (req, res) => {
    try {
        const user = req.user;
        const filepath = req.file.path.replace('public', '');
        const fullPath = path.join(__dirname,'../',req.file.path)
        const formdata = new form();

        formdata.append(
            'image', 
            fs.createReadStream(fullPath),
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        );
        const a = await axios.post(process.env.KYC_apiurl,formdata,{
            headers: {
                ...formdata.getHeaders(),
                'api_key': process.env.KYC_apikey
            }
        })
        if(a.data.errorCode){
            return res.status(400).json({Error:a.data.errorMessage});
        }

        const userdt = await a.data.data[0]
        if(userdt.type != 'chip_front'){
            return res.status(400).json({Error:'Vui vòng gửi ảnh CCCD mặt trước'});
        }
        
        const newinfo = {
            dt_front_cccd            :filepath,
            verification_status      :1,
                        
            info_cccdId              :userdt.id,
            info_name                :userdt.name,
            info_DateOfBirth         :userdt.dob,
            info_sex                 :userdt.sex,
            info_nationality         :userdt.nationality,
            info_home                :userdt.home,
            info_address             :userdt.address,
            info_DateOfExpire        :userdt.doe,
            
        }
        console.log(userdt);
        console.log(newinfo);
        const usercheck = await User.findByIdAndUpdate(user.userId,newinfo)

        
        return res.status(200).json({});
    } catch (error) {return res.status(500).json({error})}
};
const KYC_step2 = async (req, res) => {
    try {
        const user = req.user;
        const filepath = req.file.path.replace('public', '');
        const fullPath = path.join(__dirname,'../',req.file.path)
        const formdata = new form();
        formdata.append(
            'image', 
            fs.createReadStream(fullPath),
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype
            }
        );
        const a = await axios.post(process.env.KYC_apiurl,formdata,{
            headers: {
                ...formdata.getHeaders(),
                'api_key': process.env.KYC_apikey
            }
        })
        if(a.data.errorCode){
            return res.status(400).json({Error:a.data.errorMessage});
        }

        const userdt = await a.data.data[0]
        if(userdt.type != 'chip_back'){
            return res.status(400).json({Error:'Vui vòng gửi ảnh CCCD mặt sau'});
        }
        const checkfront = userdt.mrz_details
        const userolddt = await User.findById(user.userId)
        
        const newinfo = {
            dt_back_cccd            :filepath,
            verification_status      :2,
        }
        if(
            checkfront.id  != userolddt.info_cccdId ||
            checkfront.doe != userolddt.info_DateOfExpire ||
            checkfront.dob != userolddt.info_DateOfBirth 
        ){
            return res.status(401).json({Error:'Thông tin không trùng khớp với CCCD mặt trước'})
        }
        userolddt.dt_back_cccd=filepath
        userolddt.verification_status=2
        userolddt.info_Features= userdt.features
        userolddt.info_IssueDate= userdt.issue_date
        await userolddt.save()
        return res.status(200).json({});
    } catch (error) {return res.status(500).json({error})}
};
const KYC_step3 = async (req, res) => {
    try {        
        const user = req.user;
        const userdt = await User.findById(user.userId)

        const filepath = req.file.path.replace('public', '');
        const fullPath_video = path.join(__dirname,'../',req.file.path)

        const fullPath_img = path.join(__dirname,'../public',userdt.dt_front_cccd)

        const formdata = new form();
        formdata.append('cmnd', fs.createReadStream(fullPath_img));
        formdata.append('video',fs.createReadStream(fullPath_video))
        // return res.status(200).json({})
        const a = await axios.post(process.env.KYC_apiliveness,formdata,{
            headers: {
                ...formdata.getHeaders(),
                'api_key': process.env.KYC_apikey
            }
        })
        const result = a.data.liveness
        // console.log(result);
        // console.log(Boolean(result.is_live));
        if(Boolean(result.is_live) && result.code == 200 ){
            const checkisset = await User.find({flag:true, info_cccdId: userdt.info_cccdId })
            if(checkisset){
                userdt.flag                 = false;
                userdt.verification_status  = 0;
                userdt.role                 = 'user'
                userdt.dt_vid               = ''


                return res.status(402).json({Error:'Thông tin CCCD đã được người khác dùng vui lòng thử lại sau'})
            }


            userdt.flag                 = true
            userdt.verification_status  = 3
            userdt.dt_vid               = filepath
            userdt.role                 = 'KOL'
            await userdt.save()
            return res.status(200).json({})
        }
        if( result.is_deepfake!='N/A' && Boolean(result.is_deepfake)){
            return res.status(405).json({Error:'Deepfake detected'})
        }
        return res.status(400).json({Error:'Liveness check failed'});

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
