const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationsSchema = new Schema({
    user:        { type: mongoose.Schema.Types.ObjectId , required: true},
    campaign:    { type: mongoose.Schema.Types.ObjectId , required: true},

    amount:      { type: Number, required: true },
    content:     { type: String, },
    isAnonymous: { type: Boolean, default: false },
    

    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "fail"],
    },
    
    paymentGateway: { 
        type: String, 
        enum: ['vnpay', 'momo'],
    },
    transactionId: { 
        type: String, 
        required: true, 
        unique: true 
    },


    transactionId:        { type: String, unique: true },
    transactionDate:      { type: Date },
    transactionStatus:    { type: String },
    transactionCode:      { type: String },
    transactionMessage:   { type: String },
});


const Danhmuc = mongoose.model('donations', donationsSchema);
module.exports = Danhmuc;