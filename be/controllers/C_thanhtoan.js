require("dotenv").config();

const { VNPay, ProductCode, VnpLocale } = require("vnpay");



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


const VNPAY_return = async (req, res) => {
    const query = req.query;
    console.log(query);
    console.log(123123);
    
    
    return res.status(200).json({});
    return res.redirect(process.env.FRONTEND_URL + "/donation");
};



module.exports = {
    VNPAY_createPayment,
    VNPAY_return
};



// vnp_Amount=8000000
// vnp_BankCode=NCB
// vnp_BankTranNo=VNP14969947
// vnp_CardType=ATM
// vnp_OrderInfo=thanh+toan
// vnp_PayDate=20250521105542
// vnp_ResponseCode=00
// vnp_TmnCode=U3AH78QC
// vnp_TransactionNo=14969947
// vnp_TransactionStatus=00
// vnp_TxnRef=1747799685525

// vnp_SecureHash=491dd3cc142883bbe6e807a2957753795cd7e249e5a04a0683b2eaea6725122b77039c44cdb275f074af48b583ec37745468869d0a49931c8cc468e5e6cc937f