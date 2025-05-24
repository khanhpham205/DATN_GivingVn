require("dotenv").config();
const { VNPay, ProductCode, VnpLocale } = require("vnpay");

const Donation = require("../models/M_donation");


const addDonation = async (req, res, next) => {
    const { id } = req.params;
    const { amount, content } = req.body;

    if (!amount ){
        return res.status(400).json({ Error: "Vui lòng nhập đủ thông tin" });
    }
    try {

        const newDonation = new Donation({
            _id: new mongoose.Types.ObjectId(), 
            user: req.user.userId,
            campaign: id,
            amount,
            content,
        });

        await newDonation.save();
        req.vnp_TxnRef = newDonation._id;
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ Error: "Có lỗi xảy ra" });
    }   
}

const getDonation = async(req,res)=>{
    try {
        const data = await Donation.find({user: req.user.userId}).populate('campaign')

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ Error: "Có lỗi xảy ra" });
    }
}
const delDonation = async(req,res)=>{
    const id = req.params.id;
    if(!id) return res.status(400).json({Error: "Vui lòng cung cấp đủ thông tin "})
    try {
        await Donation.findByIdAndDelete(id);
        return res.status(200).json()
    } catch (error) {return res.status(500).json({ Error: "Có lỗi xảy ra" })}
}

const checkDonate = async(req,res,next)=>{
    const id = req.params.id;
    if(!id) return res.status(400).json({Error: "Vui lòng cung cấp đủ thông tin "})
    try {
        const check = await Donation.findById(id)
        if(!check){
            return res.status(400).json({Error:"Không tìm thấy lượt ủng hộ"})
        }else if(check.user == req.user.userId){
            next()
        }
        else{
            return res.status(401).json({Error:'Bạn không phải author của donation này vui lòng thử lại sau'})
        }
    } catch (error) {
        return res.status(500).json({ Error: "Có lỗi xảy ra" });
    }
}

const VNPAY_createPayment = async (req, res) => {
    const vnpay = new VNPay({
        secureSecret: process.env.VNPAY_HASH_SECRET,
        tmnCode: process.env.VNPAY_TMN_CODE,
    });
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const {amount,content} = req.body;
    if(!amount || !content){
        return res.status(400).json({Error:'Vui lòng nhập đủ thông tin'})
    }
 
    const data = {
        vnp_Amount: amount,
        vnp_IpAddr:
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.ip,
        vnp_OrderInfo: content,
        vnp_ReturnUrl: `${process.env.BASE_URL}/donation/vnpay_return`,
        vnp_TxnRef: req.vnp_TxnRef,
        vnp_Locale: VnpLocale.VN,
        vnp_OrderType: ProductCode.Other,
    };
    const url = vnpay.buildPaymentUrl(data);
    console.log(data.vnp_TxnRef);

    return res.json(url);
};

const MOMO_createPayment = async (req, res) => {
    return res.json();
};

const VNPAY_return = async (req, res) => {
    const query = req.query;
    console.log(query);
    
    return res.status(200).json({});
};


module.exports = {
    addDonation,
    getDonation,
    delDonation,
    checkDonate,

    MOMO_createPayment,
    VNPAY_createPayment,
    VNPAY_return,
};

