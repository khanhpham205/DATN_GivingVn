require("dotenv").config();


const Donation = require("../models/M_donation");


const donate = async (req, res, next) => {
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
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Error: "Có lỗi xảy ra" });
    }   
    
}



module.exports = {
    donate,
};

