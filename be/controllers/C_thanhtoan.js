require("dotenv").config();

const { VNPay, ProductCode, VnpLocale, dateFormat } = require("vnpay");

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
        vnp_ReturnUrl: "http://localhost:3000",
        vnp_TxnRef: new Date().getTime().toString(),
        vnp_Locale: VnpLocale.VN,
        vnp_OrderType: ProductCode.Other,
    };
    const url = vnpay.buildPaymentUrl(data);
    console.log(data.vnp_TxnRef);

    return res.json(url);
};

module.exports = {
    VNPAY_createPayment,
};