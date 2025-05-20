const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true },
        phonenumber: { type: String, unique: true },
        password: { type: String },

        role: {
            type: String,
            default: "user",
            enum: [
                "user", 
                "KOL", 
                "adminlvl1_zone0",
                "adminlvl1_zone1",
                "adminlvl1_zone2", 
                "admin"
            ],
        },

        googleId:   { type: String, unique: true, sparse: true },
        facebookId: { type: String, unique: true, sparse: true },
        avatar:     { type: String },

        provider: {
            type: String,
            enum: ["local", "Oauth"],
            required: true,
        },

        flag:                   { type: Boolean, default: false, required: true },
        verification_status:    { type: Number, default: 0, require: true },

        dt_front_cccd:          { type: String },
        dt_back_cccd:           { type: String },
        dt_vid:                 { type: String },

        info_Type:              { type: String },

        info_cccdId:            { type: String },
        info_name:              { type: String },
        info_DateOfBirth:       { type: String },
        info_sex:               { type: String },
        info_nationality:       { type: String },
        info_home:              { type: String },
        info_address:           { type: String },
        info_DateOfExpire:      { type: String },
        info_Features:          { type: String },
        info_IssueDate:         { type: String }, //ngay lam cccd
        info_IssueLocation:     { type: String },
    },
    { timestamps: true }
);

// Băm mật khẩu nếu có
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;

// const tmp = {
//     "errorCode": 0,
//     "errorMessage": "",
//     "data": [
//         {
//             "id": "079205031850",
//             "id_prob": "99.33",
//             "name": "PHẠM NGUYỄN BẢO KHÁNH",
//             "name_prob": "99.93",
//             "dob": "15/12/2005",
//             "dob_prob": "99.01",
//             "sex": "NAM",
//             "sex_prob": "99.24",
//             "nationality": "VIỆT NAM",
//             "nationality_prob": "99.44",
//             "home": "QUẢNG TRẠCH, QUẢNG BÌNH",
//             "home_prob": "98.45",
//             "address": "36E1 TỔ 5 ẤP 5, XUÂN THỚI SƠN, HÓC MÔN, HỒ CHÍ MINH",
//             "address_prob": "99.05",
//             "doe": "15/12/2030",
//             "doe_prob": "98.44",
//             "overall_score": "99.63",
//             "number_of_name_lines": "1",
//             "address_entities": {
//                 "province": "HỒ CHÍ MINH",
//                 "district": "HÓC MÔN",
//                 "ward": "XUÂN THỚI SƠN",
//                 "street": "36E1 TỔ 5 ẤP 5"
//             },
//             "type_new": "cccd_chip_front",
//             "type": "chip_front"
//         }
//     ]
// }