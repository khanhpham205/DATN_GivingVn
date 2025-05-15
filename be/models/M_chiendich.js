const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const MA_MIEN_BAC = [
  "01", "02", "04", "06", "08", "10", "11", "12", "14", "15", "17",
  "19", "20", "22", "24", "25", "26", "27", "30", "31", "33", "34",
  "35", "36", "37"
]; // ✅ 25 tỉnh/thành

const MA_MIEN_TRUNG = [
  "38", "40", "42", "44", "45", "46", "48", "49", "51", "52",
  "54", "56", "58", "60", "62", "64", "66", "67", "68"
]; // ✅ 19 tỉnh/thành

const MA_MIEN_NAM = [
  "70", "72", "74", "75", "77", "79", "80", "82", "83", "84",
  "86", "87", "89", "91", "92", "93", "94", "95", "96"
]; // ✅ 19 tỉnh/thành

const locationSchema = new  mongoose.Schema({
    
});

const ChiendichSchema = new mongoose.Schema({
        danhmuc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "danhmucs",
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        acceptBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

        name:    { type: String, required: true, unique: true },
        desc:    { type: String, required: true },
        target:  { type: Number, required: true },
        current: { type: Number, default: 0, },

        thumbnail: { type: String, required: true }, //ảnh bìa chiến dịch

        status: {
            type: String,
            default: "pending",
            enum: ["pending", "inProcess", "success", "fail"],
        },

        startDate: { type: Date },
        endDate: { type: Date },

        location: {
            provinceId: { type: String, required: true }, // mã tỉnh lọc 3 miền
            province:   { type: String, required: true }, // tỉnh | thành phố
            district:   { type: String, required: true }, // quận | huyện
            ward:       { type: String, required: true }, // phường
            detail:     { type: String, required: true }, // số nhà, tên đường...
            region: {
                type: String,
                enum: ["Bắc", "Trung", "Nam"],
            },
            regionId:{
                type: Number,
                enum: [0, 1, 2],
            }
        },



    },
    { timestamps: true }
);

ChiendichSchema.pre("save", function (next) {
    if (!this.isModified("location") && !this.isModified("location.provinceId")) {
         next();
    }
    const provinceId = this.location.provinceId;
    if (!provinceId) return next(new Error("provinceId is required"));

    if(MA_MIEN_TRUNG.includes(String(provinceId))){
        this.location.region = "Trung";
        this.location.regionId = 1;
    }else if(MA_MIEN_NAM.includes(String(provinceId))){
        this.location.regionId = 2;
        this.location.region = "Nam";
    }else{
        this.location.regionId = 0;
        this.location.region = "Bắc";
    }
    next();
});

const Chiendich = mongoose.model("Chiendich", ChiendichSchema);

module.exports = Chiendich;